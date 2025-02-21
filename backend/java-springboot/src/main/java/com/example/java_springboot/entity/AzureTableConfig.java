package com.example.java_springboot.entity;

import com.azure.data.tables.TableClient;
import com.azure.data.tables.TableServiceClient;
import com.azure.data.tables.TableServiceClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AzureTableConfig {
    @Value("${azure.storage.connection-string}")
    private String connectionString;

    public TableClient getTableClient(String tableName) {
        TableServiceClient tableServiceClient = new TableServiceClientBuilder()
                .connectionString(connectionString)
                .buildClient();

        tableServiceClient.createTableIfNotExists(tableName);
        return tableServiceClient.getTableClient(tableName);
    }
}