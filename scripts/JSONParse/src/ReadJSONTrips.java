import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Iterator;

public class ReadJSONTrips {
    /**
     * Method that parses the given JSON file and returns the desired output of the duplicate
     * username data.
     * @param args
     */
    public static void main(String[] args)
    {
        StringBuilder str = new StringBuilder();
        try
        {
            JSONParser jsonParser = new JSONParser();

            JSONObject jsonObject = (JSONObject) jsonParser.parse(new FileReader("C:\\Users\\mihir\\Desktop\\JSONS\\routeSL5trips.json"));

            JSONArray jsonArray = (JSONArray) jsonObject.get("data");
            str.append("{\"data\":[");
            Iterator<JSONObject> iterator = jsonArray.iterator();
            while(iterator.hasNext()) {
                JSONObject jO1 = iterator.next();
                str.append("{\"attributes\":{");
                str.append("\"trip_id\":\"");
                str.append(jO1.get("id"));

                JSONObject jO3 = (JSONObject) jO1.get("relationships");
                JSONObject jO4 = (JSONObject) jO3.get("route");
                JSONObject jO5 = (JSONObject) jO4.get("data");
                str.append("\",\"route_id\":\"");
                str.append(jO5.get("id"));

                if (iterator.hasNext()){
                    str.append("\"}},");
                } else {
                    str.append("\"}}");
                }
            }
            str.append("]}");

            try {
                FileWriter file = new FileWriter("C:\\Users\\mihir\\Desktop\\routeSL5trips_11_11_19.json");
                file.write(str.toString());
                file.flush();
                file.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
