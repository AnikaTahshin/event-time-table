"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import moment from "moment";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const [value, setValue] = useState(null);
const [mounted, setMounted] = useState(false);

useEffect(() => {
  const saved = localStorage.getItem("selectedDay");

  if (saved !== null) {
    setValue(parseInt(saved, 10));
  } else {
    setValue(0);
  }

  setMounted(true);
}, []);

useEffect(() => {
  if (mounted && value !== null) {
    localStorage.setItem("selectedDay", value.toString());
  }
}, [value, mounted]);

if (!mounted || value === null) {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader loading={true} />
    </div>
  );
}


 
  const getNextSevenDays = () => {
    let days = [];
    let daysRequired = 7;
    for (let i = 0; i < daysRequired; i++) {
      let day = moment().add(i, "days");
      days.push({
        date: day.format("YYYY-MM-DD"),
        dayName: day.format("dddd"),
      });
    }
    return days;
  };

  const sevenDaysFromNow = getNextSevenDays();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

const ROW_HEIGHT = 40;
const TIME_COL_WIDTH = 120;
const VENUE_COL_WIDTH = 180;

  const venues = [
    "Venue 1",
    "Venue 2",
    "Venue 3",
    "Venue 4",
    "venue 5",
    "Venue 6",
    "Venue 7",
  ];

  
  const allEvents = [
   
    {
      id: 1,
      date: sevenDaysFromNow[0]?.date,
      venue: ["Venue 1"], 
      start: "08:00",
      end: "09:30",
      title: "Morning Yoga",
      color: "#e1f5fe", 
    },
    {
      id: 2,
      date: sevenDaysFromNow[0]?.date,
      venue: ["Venue 2", "Venue 3"], 
      start: "09:00",
      end: "11:00",
      title: "Team Meeting (Joint)",
      color: "#f3e5f5", 
    },
    {
      id: 3,
      date: sevenDaysFromNow[0]?.date,
      venue: "Venue 1", 
      start: "10:00",
      end: "11:30",
      title: "Workshop A",
      color: "#e8f5e9", 
    },
   
    {
      id: 4,
      date: sevenDaysFromNow[1]?.date,
      venue: "Venue 3",
      start: "09:00",
      end: "10:30",
      title: "Client Presentation",
      color: "#fff3e0", 
    },
    {
      id: 5,
      date: sevenDaysFromNow[1]?.date,
      venue: ["Venue 1", "Venue 2"],
      start: "11:00",
      end: "12:30",
      title: "Training Session",
      color: "#ffebee", 
    },
   
    {
      id: 6,
      date: sevenDaysFromNow[2]?.date,
      venue: ["Venue 3","Venue 4"],
      start: "08:30",
      end: "10:00",
      title: "Strategy Planning",
      color: "#e1f5fe", 
    },
    {
      id: 7,
      date: sevenDaysFromNow[2]?.date,
      venue: ["Venue 5", "Venue 6"],
      start: "14:00",
      end: "16:00",
      title: "Product Demo",
      color: "#f3e5f5", 
    },

    {
      id: 8,
      date: sevenDaysFromNow[4]?.date,
      venue: [ "Venue 5","Venue 6"],
      start: "9:00",
      end: "10:00",
      title: "Opera Practice",
      color: "#f3e5f5", 
    },

    {
      id: 9,
      date: sevenDaysFromNow[5]?.date,
      venue: [ "Venue 3","Venue 4", "Venue 5"],
      start: "9:00",
      end: "10:30",
      title: "Class Test",
      color: "#f3e5f5", 
    },

    {
      id: 10,
      date: sevenDaysFromNow[6]?.date,
      venue: [ "Venue 1","Venue 2",],
      start: "12:00",
      end: "13:00",
      title: "Discussion Event",
      color: "#f3e5f5", 
    },

     {
      id: 11,
      date: sevenDaysFromNow[3]?.date,
      venue: [ "Venue 3","Venue 4"],
      start: "9:00",
      end: "10:00",
      title: "Team Event",
      color: "#f3e5f5", 
    },

     {
      id: 12,
      date: sevenDaysFromNow[3]?.date,
      venue: [ "Venue 1","Venue 2"],
      start: "8:00",
      end: "8:30",
      title: "Practise Session",
      color: "#f3e5f5", 
    },

  ];

 
  return (
    <div className="flex  min-h-screen i justify-center bg-zinc-50 font-sans dark:bg-black">
      <Box className="border border-black my-5" sx={{ maxWidth: "50%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {sevenDaysFromNow?.map((day, index) => (
            <Tab
              key={index}
              label={
                <div
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     lineHeight: 1,
                  }}

                  onClick={() => setValue(index)}
                >
                  <span style={{ fontSize: "0.75rem",fontWeight: 600,}}>{day?.dayName}</span>
                  <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>
                    Date: {day?.date}
                  </span>
                </div>
              }
            />
          ))}
        </Tabs>

       
        {(() => {
         

          const generateTimeSlots = (
            start = "08:00",
            end = "18:00",
            interval = 15
          ) => {
            const slots = [];
            let cur = moment(start, "HH:mm");
            const endM = moment(end, "HH:mm");
            while (cur <= endM) {
              slots.push(cur.format("HH:mm"));
              cur = cur.clone().add(interval, "minutes");
            }
            return slots;
          };

          const slots = generateTimeSlots();

          
          const selectedDate = sevenDaysFromNow[value]?.date;
          const events = allEvents.filter((e) => e?.date === selectedDate);

          const getEventStyle = (start, end) => {
            const startMoment = moment(start, "HH:mm");
            const endMoment = moment(end, "HH:mm");
            const gridStart = moment("08:00", "HH:mm");

            const startDiffMinutes = startMoment.diff(gridStart, "minutes");
            const durationMinutes = endMoment.diff(startMoment, "minutes");

            const top = (startDiffMinutes / 15) * ROW_HEIGHT;
            const height = ((durationMinutes / 15) + 1) * ROW_HEIGHT;
        

            return { top, height };
          };

          const getEventSpan = (eventVenues) => {
            const venueList = Array.isArray(eventVenues)
              ? eventVenues
              : [eventVenues];
            const indices = venueList?.map((v) => venues.indexOf(v))?.filter((i) => i !== -1);

            if (indices?.length === 0) return { startIdx: -1, span: 0 };

            const minIndex = Math.min(...indices);
            const maxIndex = Math.max(...indices);
            const span = maxIndex - minIndex + 1;

            return { startIdx: minIndex, span };
          };

          return (
            <div
              style={{
                display: "block",
                maxHeight: 500,
                overflow: "auto",
                position: "relative",
                border: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  minWidth: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    position: "sticky",
                    top: 0,
                    zIndex: 40, 
                  }}
                >
                  <div
                    style={{
                      position: "sticky",
                      left: 0,
                      zIndex: 50, 
                      width: TIME_COL_WIDTH,
                      minWidth: TIME_COL_WIDTH,
                      height: 40,
                      background: "#fff",
                      borderBottom: "1px solid rgba(0,0,0,0.08)",
                      borderRight: "1px solid rgba(0,0,0,0.08)",
                    }}
                  />

                 
                  {venues?.map((venue, index) => (
                    <div
                      key={index}
                      style={{
                        minWidth: VENUE_COL_WIDTH,
                        padding: "8px 12px",
                        borderBottom: "1px solid rgba(0,0,0,0.08)",
                        borderRight: "1px solid rgba(0,0,0,0.06)",
                        background: "#fafafa",
                        fontWeight: 600,
                        textAlign: "center",
                        fontSize: "0.75rem"
                      }}
                    >
                      {venue}
                    </div>
                  ))}
                </div>

                
                <div style={{ display: "flex" }}>
                  
                  <div
                    style={{
                      position: "sticky",
                      left: 0,
                      zIndex: 30, 
                      width: TIME_COL_WIDTH,
                      minWidth: TIME_COL_WIDTH,
                      background: "#fff",
                      borderRight: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    {slots?.map((t, i) => (
                      <div
                        key={i}
                        style={{
                          height: ROW_HEIGHT,
                          padding: "6px 8px",
                          boxSizing: "border-box",
                          borderBottom: "1px solid rgba(0,0,0,0.04)",
                          fontSize: 12,
                        }}
                      >
                        {t}
                      </div>
                    ))}
                  </div>

                {/* venue and event area */}
                  {venues?.map((venue, vIdx) => {
                   
                    const startingEvents = events?.filter((e) => {
                      const { startIdx } = getEventSpan(e?.venue);
                      return startIdx === vIdx;
                    });

                    return (
                      <div
                        key={vIdx}
                        style={{
                          minWidth: VENUE_COL_WIDTH,
                          borderRight: "1px solid rgba(0,0,0,0.06)",
                          boxSizing: "border-box",
                          position: "relative", 
                        }}
                      >
                      
                        {slots?.map((t, i) => (
                          <div
                            key={i}
                            style={{
                              height: ROW_HEIGHT,
                              borderBottom: "1px solid rgba(0,0,0,0.03)",
                              padding: 6,
                              boxSizing: "border-box",
                            }}
                          />
                        ))}

                        
                        {startingEvents?.map((event) => {
                          const { top, height } = getEventStyle(
                            event?.start,
                            event?.end 
                        
                          );
                          const { span } = getEventSpan(event?.venue);
                          const width = span * VENUE_COL_WIDTH;

                          return (
                            <div
                              key={event?.id}
                              style={{
                                position: "absolute",
                                top: top,
                                height: height,
                                width: width, 
                                left: 0,
                                background: event.color,
                                border: "1px solid rgba(0,0,0,0.1)",
                                borderRadius: 4,
                                padding: "2px 4px",
                                fontSize: 12,
                                overflow: "hidden",
                                zIndex: 10,   
                              }}
                            >
                              <div style={{ fontWeight: 600, fontSize: 11 }}>
                                {event?.title}
                              </div>
                              <div style={{ fontSize: 9, opacity: 0.8 }}>
                                {event?.start} - {event?.end}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}
      </Box>
    </div>
  );
}
