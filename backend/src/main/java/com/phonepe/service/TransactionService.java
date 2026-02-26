package com.phonepe.service;

import com.phonepe.dto.SendMoneyRequest;
import com.phonepe.dto.TransactionResponse;
import com.phonepe.entity.Transaction;
import com.phonepe.entity.Transaction.TransactionStatus;
import com.phonepe.entity.User;
import com.phonepe.entity.Wallet;
import com.phonepe.repository.TransactionRepository;
import com.phonepe.repository.UserRepository;
import com.phonepe.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final WalletRepository walletRepository;

    @Transactional
    public TransactionResponse sendMoney(SendMoneyRequest request) {
        User sender = userRepository.findByUpiId(request.getSenderUpi())
                .orElseThrow(() -> new RuntimeException("Sender UPI ID not found: " + request.getSenderUpi()));

        User receiver = userRepository.findByUpiId(request.getReceiverUpi())
                .orElseThrow(() -> new RuntimeException("Receiver UPI ID not found: " + request.getReceiverUpi()));

        if (sender.getUpiId().equals(receiver.getUpiId())) {
            throw new RuntimeException("Cannot send money to yourself");
        }

        Wallet senderWallet = walletRepository.findByUserUpiId(request.getSenderUpi())
                .orElseThrow(() -> new RuntimeException("Sender wallet not found"));

        Wallet receiverWallet = walletRepository.findByUserUpiId(request.getReceiverUpi())
                .orElseThrow(() -> new RuntimeException("Receiver wallet not found"));

        if (senderWallet.getBalance().compareTo(request.getAmount()) < 0) {
            Transaction failedTransaction = createTransaction(
                    request.getSenderUpi(), request.getReceiverUpi(), request.getAmount(), TransactionStatus.FAILED);
            transactionRepository.save(failedTransaction);
            throw new RuntimeException("Insufficient balance. Available: " + senderWallet.getBalance());
        }

       

        try {
            senderWallet.setBalance(senderWallet.getBalance().subtract(request.getAmount()));
            walletRepository.save(senderWallet);

            receiverWallet.setBalance(receiverWallet.getBalance().add(request.getAmount()));
            walletRepository.save(receiverWallet);

            Transaction transaction = createTransaction(
                    request.getSenderUpi(), request.getReceiverUpi(), request.getAmount(), TransactionStatus.SUCCESS);
            Transaction savedTransaction = transactionRepository.save(transaction);

            return mapToTransactionResponse(savedTransaction);

        } catch (Exception e) {
            Transaction failedTransaction = createTransaction(
                    request.getSenderUpi(), request.getReceiverUpi(), request.getAmount(), TransactionStatus.FAILED);
            transactionRepository.save(failedTransaction);
            throw new RuntimeException("Transaction failed: " + e.getMessage());
        }
    }

    public List<TransactionResponse> getTransactionHistory(String upiId) {
        userRepository.findByUpiId(upiId)
                .orElseThrow(() -> new RuntimeException("UPI ID not found: " + upiId));

        List<Transaction> transactions = transactionRepository
                .findBySenderUpiOrReceiverUpiOrderByDateDesc(upiId, upiId);

        return transactions.stream()
                .map(this::mapToTransactionResponse)
                .collect(Collectors.toList());
    }

    private Transaction createTransaction(String senderUpi, String receiverUpi,
                                          BigDecimal amount, TransactionStatus status) {
        Transaction transaction = new Transaction();
        transaction.setSenderUpi(senderUpi);
        transaction.setReceiverUpi(receiverUpi);
        transaction.setAmount(amount);
        transaction.setDate(LocalDateTime.now());
        transaction.setStatus(status);
        return transaction;
    }

    private TransactionResponse mapToTransactionResponse(Transaction transaction) {
        return new TransactionResponse(
                transaction.getId(),
                transaction.getSenderUpi(),
                transaction.getReceiverUpi(),
                transaction.getAmount(),
                transaction.getDate(),
                transaction.getStatus()
        );
    }
}