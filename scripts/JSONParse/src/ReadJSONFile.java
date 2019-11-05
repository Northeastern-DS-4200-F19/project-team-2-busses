import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.*;
import java.util.*;

/**
 * Main class to parse JSON file and return desired output.
 */
public class ReadJSONFile
{

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

            JSONObject jsonObject = (JSONObject) jsonParser.parse(new FileReader("C:\\Users\\mihir\\Downloads\\routeSL5stops.json"));

            JSONArray jsonArray = (JSONArray) jsonObject.get("data");
            str.append("{\"data\":[");
            Iterator<JSONObject> iterator = jsonArray.iterator();
            while(iterator.hasNext()) {
                JSONObject jO1 = iterator.next();
                JSONObject jO2 = (JSONObject) jO1.get("attributes");
                str.append("{\"attributes\":{");
                str.append("\"name\":\"");
                str.append(jO2.get("name"));
                str.append("\",\"latitude\":\"");
                str.append(jO2.get("latitude"));
                str.append("\",\"longitude\":\"");
                str.append(jO2.get("longitude"));
                str.append("\",\"stop_id\":\"");
                str.append(jO2.get("id"));
                if (iterator.hasNext()){
                    str.append("\"},");
                } else {
                    str.append("\"}");
                }
            }
            str.append("}");


            try {
                FileWriter file = new FileWriter("C:\\Users\\mihir\\Desktop\\routeSL5stops.json");
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