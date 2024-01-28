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

