package com.example.java_springboot.service;

import com.azure.data.tables.TableClient;
import com.azure.data.tables.TableClientBuilder;
import com.azure.data.tables.models.TableEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AzureTableStorageService {

    private final TableClient userTableClient;
    private final TableClient complaintTableClient;

    public AzureTableStorageService(
            @Value("${azure.storage.endpoint}") String endpoint,
            @Value("${azure.storage.account-name}") String accountName,
            @Value("${azure.storage.account-key}") String accountKey) {

        // Initialize the User table client
        this.userTableClient = new TableClientBuilder()
                .endpoint(endpoint)
                .tableName("Users")
                .credential(new com.azure.core.credential.AzureNamedKeyCredential(accountName, accountKey))
                .buildClient();

        // Initialize the Complaint table client
        this.complaintTableClient = new TableClientBuilder()
                .endpoint(endpoint)
                .tableName("Complaints")
                .credential(new com.azure.core.credential.AzureNamedKeyCredential(accountName, accountKey))
                .buildClient();
    }

    /**
     * Save a user to Azure Table Storage.
     *
     * @param userId The ID of the user.
     * @param name   The name of the user.
     * @param email  The email of the user.
     * @throws RuntimeException If the operation fails.
     */
    public void saveUser(String userId, String name, String email) {
        try {
            TableEntity entity = new TableEntity("UserPartition", userId)
                    .addProperty("Name", name)
                    .addProperty("Email", email);
            userTableClient.createEntity(entity);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save user to Azure Table Storage: " + e.getMessage(), e);
        }
    }

    /**
     * Save a complaint to Azure Table Storage.
     *
     * @param complaintId The ID of the complaint.
     * @param title       The title of the complaint.
     * @param category    The category of the complaint.
     * @param priority    The priority of the complaint.
     * @throws RuntimeException If the operation fails.
     */
    public void saveComplaint(String complaintId, String title, String category, String priority) {
        try {
            TableEntity entity = new TableEntity("ComplaintPartition", complaintId)
                    .addProperty("Title", title)
                    .addProperty("Category", category)
                    .addProperty("Priority", priority);
            complaintTableClient.createEntity(entity);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save complaint to Azure Table Storage: " + e.getMessage(), e);
        }
    }
}