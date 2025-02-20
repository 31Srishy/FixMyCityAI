package com.example.java_springboot.Service;

import com.azure.data.tables.TableClient;
import com.azure.data.tables.TableClientBuilder;
import com.azure.data.tables.models.TableEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AzureTableStorageService {

    private final TableClient userTableClient;
    private final TableClient complaintTableClient;

    public AzureTableStorageService(@Value("${spring.cloud.azure.table.endpoint}") String endpoint,
                                    @Value("${spring.cloud.azure.storage.account-name}") String accountName,
                                    @Value("${spring.cloud.azure.storage.account-key}") String accountKey) {
        this.userTableClient = new TableClientBuilder()
                .endpoint(endpoint)
                .tableName("Users")
                .credential(new com.azure.core.credential.AzureNamedKeyCredential(accountName, accountKey))
                .buildClient();

        this.complaintTableClient = new TableClientBuilder()
                .endpoint(endpoint)
                .tableName("Complaints")
                .credential(new com.azure.core.credential.AzureNamedKeyCredential(accountName, accountKey))
                .buildClient();
    }

    public void saveUser(String userId, String name, String email) {
        TableEntity entity = new TableEntity("UserPartition", userId)
                .addProperty("Name", name)
                .addProperty("Email", email);
        userTableClient.createEntity(entity);
    }

    public void saveComplaint(String complaintId, String title, String category, String priority) {
        TableEntity entity = new TableEntity("ComplaintPartition", complaintId)
                .addProperty("Title", title)
                .addProperty("Category", category)
                .addProperty("Priority", priority);
        complaintTableClient.createEntity(entity);
    }
}

