package com.example.java_springboot.entity;
import com.azure.data.tables.TableClient;
import com.azure.data.tables.TableServiceClient;
import com.azure.data.tables.TableServiceClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AzureTableConfig {
    @Value("${spring.cloud.azure.storage.account-name}")
    private String accountName;

    @Value("${spring.cloud.azure.storage.account-key}")
    private String accountKey;

    public TableClient getTableClient(String tableName) {
        String connectionString = String.format(
                "DefaultEndpointsProtocol=https;AccountName=%s;AccountKey=%s;EndpointSuffix=core.windows.net",
                accountName, accountKey
        );

        TableServiceClient tableServiceClient = new TableServiceClientBuilder()
                .connectionString(connectionString)
                .buildClient();

        tableServiceClient.createTableIfNotExists(tableName);
        return tableServiceClient.getTableClient(tableName);
    }
}
