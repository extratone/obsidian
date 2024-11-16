---
title: "Flightplan files - v11 .fms file format - X-Plane Developer"
url: "https://developer.x-plane.com/article/flightplan-files-v11-fms-file-format/"
created: {{published}
source: "developer.x-plane.com"
description: "The new v11 .fms flightplan format allows saving and loading flightplans with coded instrument flight procedures. These files are understood by the X-Plane 11 GPS (GNS430W/530W), G1000 and FMS."
---
Flightplan files must be located in the Output/FMS plans/ directory.

The .fms file is a text file – Unix or Windows line endings are legal and the character set should be UTF-8. Spaces or tabs are allowed as whitespace.

The header of the file must be

```
I
1100 Version
```

Since this is a plain text file with no binary data, there’s no difference between ‘I’ or ‘A’ as the first line. The currently supported versions are 3 (legacy, not written but still loaded by X-Plane 11) and 1100 (current).

Next is the AIRAC cycle number of the cycle the file was created with. This line is mandatory as the third line of the file. It is given as a four-digit number:

```
CYCLE 1710
```

Next is the departure block, which can be either an airport or any named point in the X-Plane nav database. In case of an airport, the departure block will look like this

```
ADEP KGSO
```

optionally, the lines for departure runway, instrument departure and transition can follow:

```
DEPRWY RW14
SID TRSHA1
SIDTRANS BAWDS
```

If no departure procedure is part of the flightplan, the SID and SIDTRANS lines can be omitted. If the departure has no transitions, the SIDTRANS line can be omitted. If no departure procedures are available or no loading of a procedure desired, the DEPRWY line can be omitted.

If the flightplan starts at a point other than an airport the departure block looks like this:

```
DEP CTF
```

CTF in this case represents a VOR, more precise information on this point is then given in the enroute section of the flightplan.

Next is the destination block. It is similarly structured to the departure block and can include destination airport, runway, arrival, arrival transition, approach and approach transition:

```
ADES KRDU
DESRWY RW05L
STAR ALDAN1
STARTRANS ROA
APP I05L 
```

If any off APP or STAR is set, the DESRWY is required! STAR and STARTRANS can be omitted if no arrival is desired. APP and APPTRANS can be omitted if no instrument approach is desired. APPTRANS is optional and can follow APP, just like STARTRANS is optional after the STAR. APPTRANS can be omitted if no transitions are available for the given approach or vector to final is desired.  
An exception to the above rule is a circling approach with no runway, in which no DESRWY will be set. In this case, the loading of STARs prior to this approach is limited to STARs with non-empty trunk routes, as with no runway, no runway transition can be loaded.  
The name of the approach must be given in the format of ARINC 424.18+, section 5.10. Examples: I26L, B08R, R29, V01L, N35, R35-Y, VDM, NDBB, LOCD, …

If the flightplan ends at a point other than an airport the destination block looks like this:

```
DES RDU
```

RDU in this case represents a VOR, more precise information on this point is then given in the enroute section of the flightplan.

Next is the enroute block of the flightplan. It starts with the number of enroute waypoints:

```
NUMENR 9
```

This is the number of waypoints in the flightplan that are NOT part of an instrument departure, arrival, transition, approach or missed approach. The waypoints listed can be either direct (DRCT) legs or via an ATS airway. The format is similar to the v3 flightplan, but adds a field for the via airway or other special rule of the waypoint.  
Only track-to-fix legs are listed here. Note that any special leg types can be loaded as part of a published procedure, via the departure or destination block explained above.

A typical enroute block after the NUMENR field might look like this:

```
1 KCUB ADEP 4.000000 33.970470 -80.995247 
3 CTF DRCT 0.000000 34.650497 -80.274918 
11 NOMOE V155 0.000000 34.880920 -79.996437 
11 LILLS V155 0.000000 34.935440 -79.930206 
3 SDZ V155 0.000000 35.215481 -79.587936 
11 OCHOC V155 0.000000 35.402336 -79.361153 
11 MOATS V155 0.000000 35.621601 -79.092964 
3 RDU V155 0.000000 35.872520 -78.783340 
1 KRDU ADES 435.000000 35.877640 -78.787476 
```

The first column is the type of waypoint, and corresponds to the first column in a v3 .fms file. It is 1 for airport, 2 for NDB, 3 for VOR, 11 for named fix and 28 for unnamed lat/lon waypoints.  
The second column is the identifier of the waypoint, and corresponds to the second column in a v3 .fms file.  
The third column is the via/special column. It can have the following values: ADEP/ADES for departure or destination airport of the flightplan, DRCT for a direct or random route leg to the waypoint, or the name of an airway or ATS route to the waypoint.  
The fourth column is the required altitude in feet and corresponds to the third column in a v3 .fms file.  
The fifth and six columns are the latitude and longitude of the waypoint, given in decimal degrees and correspond to the fourth and fifth column of a v3 .fms file.

---

## Example

This is an example of a valid v11 flightplan .fms file:

```
I
1100 Version
CYCLE 1710 
ADEP KCUB 
DEPRWY RW13
ADES KRDU 
DESRWY RW05L 
APP I05L 
NUMENR 9 
1 KCUB ADEP 0.000000 33.970470 -80.995247 
3 CTF DRCT 0.000000 34.650497 -80.274918 
11 NOMOE V155 0.000000 34.880920 -79.996437 
11 LILLS V155 0.000000 34.935440 -79.930206 
3 SDZ V155 0.000000 35.215481 -79.587936 
11 OCHOC V155 0.000000 35.402336 -79.361153 
11 MOATS V155 0.000000 35.621601 -79.092964 
3 RDU V155 0.000000 35.872520 -78.783340 
1 KRDU ADES 435.000000 35.877640 -78.787476 
```

---

## Backward compatibility

X-Plane 11.10 can still load the following other, older formats of flightplans:

- v3 .fms files, containing waypoints only but no airways or procedures, can be loaded into the GPS or FMS
- .flp files, containing waypoints and airways, can be loaded by the airliner FMS
- .fml files generated with the v11 FMS can be loaded by the airliner FMS

X-Plane 12 can read and write v11 .fms files.