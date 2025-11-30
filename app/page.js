"use client";
import * as React from "react";

import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import moment from "moment";

export default function Home() {
  const [value, setValue] = useState(0);

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
  console.log(sevenDaysFromNow);

  const handleChange = ( newValue) => {
    setValue(newValue);
  };
  return (
    <div className="flex  min-h-screen i justify-center bg-zinc-50 font-sans dark:bg-black">
      <Box
        className="border border-black "
        sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {sevenDaysFromNow.map((day, index) => (
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
                >
                  <span>{day.dayName}</span>
                  <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>
                   Date: {day.date}
                  </span>
                </div>
              }
            />
          ))}
        </Tabs>
      </Box>
    </div>
  );
}
