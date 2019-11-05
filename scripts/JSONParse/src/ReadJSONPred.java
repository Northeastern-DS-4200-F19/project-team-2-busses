import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Iterator;

public class ReadJSONPred {

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

            JSONObject jsonObject = (JSONObject) jsonParser.parse(new FileReader("C:\\Users\\mihir\\Downloads\\routeSL5schedules.json"));

            JSONArray jsonArray = (JSONArray) jsonObject.get("data");
            str.append("{\"data\":[");
            Iterator<JSONObject> iterator = jsonArray.iterator();
            while(iterator.hasNext()) {
                JSONObject jO1 = iterator.next();
                JSONObject jO2 = (JSONObject) jO1.get("attributes");
                str.append("{\"attributes\":{");
                str.append("\"arrival_time\":\"");
                str.append(jO2.get("arrival_time"));
                str.append("\",\"departure_time\":\"");
                str.append(jO2.get("departure_time"));
                str.append("\",\"direction_id\":\"");
                str.append(jO2.get("direction_id"));
                str.append("\",\"stop_sequence\":\"");
                str.append(jO2.get("stop_sequence"));

                str.append("\",\"schedule_id\":\"");
                str.append(jO1.get("id"));

                JSONObject jO3 = (JSONObject) jO1.get("relationships");
                JSONObject jO4 = (JSONObject) jO3.get("route");
                JSONObject jO5 = (JSONObject) jO4.get("data");
                str.append("\",\"route_id\":\"");
                str.append(jO5.get("id"));

                JSONObject jO6 = (JSONObject) jO3.get("stop");
                JSONObject jO7 = (JSONObject) jO6.get("data");
                str.append("\",\"stop_id\":\"");
                str.append(jO7.get("id"));

                JSONObject jO8 = (JSONObject) jO3.get("trip");
                JSONObject jO9 = (JSONObject) jO8.get("data");
                str.append("\",\"trip_id\":\"");
                str.append(jO9.get("id"));

                if (iterator.hasNext()){
                    str.append("\"},");
                } else {
                    str.append("\"}");
                }
            }
            str.append("}");

            try {
                FileWriter file = new FileWriter("C:\\Users\\mihir\\Desktop\\routeSL5schedule.json");
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
