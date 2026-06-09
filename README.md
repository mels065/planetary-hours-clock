# Planetary Hours Clock

Since ancient times, the days of the weeks have been associated with the different heavenly bodies. They can be seen as such:

| Day of the Week | Planet | Sigil |
| --------------- | ------ | ----- |
| Sunday          | Sun     | ☉     |
| Monday          | Moon    | ☽     |
| Tuesday         | Mars    | ♂     |
| Wednesday       | Mercury | ☿     |
| Thursday        | Jupiter | ♃     |
| Friday          | Venus   | ♀     |
| Saturday        | Saturn  | ♄     |

In addition to planetary days, there are also planetary hours, which change depending on the day of the week. There are 12 planetary hours for daylight, and 12 for nighttime. Their calculation works as thus:

1. The time when the sun rises is the first planetary hour of the day; this hour corresponds with the planetary day (i.e. If it is a Sunday, the sunrise/first planetary hour would be to the Sun).
2. Next, find the the time when the sun sets. Derive the total minutes between the sunrise and the sunset. This the total daytime.
3. Subtract the daytime minutes from the total minutes in a full day (includes day and night time, and is 1440 minutes) to obtain the total night time.
4. If you divide the day time minutes by 12, you will get the total time in minutes for each day time hour. Do the same for the night time hours to get the total time for the night time hours.

```
i.e. (Using today March 25, 2026 in Philadelphia, PA) If sunrise is at 6:55 am and sunset is at 7:17pm, the total amount of minutes between these times is 742 minutes, which is our day time minutes. By subtracting that number from 1440 (total minutes in a day), we get the night time minutes of 698.

742 / 12 = 61.8333 minutes per day time hour
698 / 12 = 58.1666 minutes per night time hour

We can then use these calculations to generate the planetary hours for this day for both the daytime and nighttime. Since it is a Wednesday, this would mean that the first planetary hour is associated with Mercury. With each passing hour, we move to the next body. This movement is ordered from the slowest to the fasted moving body from our point of view on Earth (Saturn -> Jupiter -> Mars -> Sun -> Venus -> Mercury -> Moon), and loops back around. So we can then render an hourly time table.
```

## Daytime Hours (Wednesday, March 25, 2026)

| Time Frame | Planetary Hour |
| ---------- | -------------- |
| 6:55am - 7:56am | Mercury |
| 7:56am - 8:58am | Moon |
| 8:58am - 10:00am | Saturn |
| 10:00am - 11:02am | Jupiter |
| 11:02am - 12:04pm | Mars |
| 12:04pm - 1:05pm | Sun |
| 1:05pm - 2:07pm | Venus |
| 2:07pm - 3:09pm | Mercury |
| 3:09pm - 4:11pm | Moon |
| 4:11pm - 5:13pm | Saturn |
| 5:13pm - 6:15pm | Jupiter |
| 6:15pm - 7:17pm | Mars |

## Nighttime Hours (Wednesday, March 25, 2026)

| Time Frame | Planetary Hour |
| ---------- | -------------- |
| 7:17pm - 8:15pm | Sun |
| 8:15pm - 9:13pm | Venus |
| 9:13pm - 10:11pm | Mercury |
| 10:11pm - 11:09pm | Moon |
| 11:09pm - 12:07am | Saturn |
| 12:07am - 1:05am | Jupiter |
| 1:05am - 2:04am | Mars |
| 2:04am - 3:02am | Sun |
| 3:02am - 4:00am | Venus |
| 4:00am - 4:58am | Mercury |
| 4:58am - 5:56am | Moon |
| 5:56am - 6:54am | Saturn |

The clever thing about how this is crafted is that the sunrise hour corresponding with the next day will land on its associated planet. So the next day at sunrise, the planetary hour will be Jupiter!

This project will display the current planetary hour, and show all the planetary hours corresponding with the current day.

## Acknowledgement
This software utilizes the [`Sunrise Sunset API`](https://sunrise-sunset.org/api)
