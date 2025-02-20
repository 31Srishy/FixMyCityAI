package com.example.java_springboot.Entity;
import com.azure.data.tables.TableClient;
import com.azure.data.tables.TableServiceClient;
import com.azure.data.tables.TableServiceClientBuilder;
import com.azure.data.tables.models.TableEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.UUID;

package backend.java-springboot.src.main.java.com.example.java_springboot.Entity;
import com.azure.data.tables.TableClient;
import com.azure.data.tables.TableServiceClient;
import com.azure.data.tables.TableServiceClientBuilder;
import com.azure.data.tables.models.TableEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.UUID;

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
