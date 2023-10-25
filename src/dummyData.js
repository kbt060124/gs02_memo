import { v4 as uuidv4 } from "uuid";

let dummyData = [
  {
    id: uuidv4(),
    title: "📝ParkingLot",
    tasks: [
      {
        id: uuidv4(),
        title: "Reactの勉強",
      },
      {
        id: uuidv4(),
        title: "Youtubeで勉強",
      },
      {
        id: uuidv4(),
        title: "散歩",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "🚀Today",
    tasks: [
      {
        id: uuidv4(),
        title: "コーディング",
      },
      {
        id: uuidv4(),
        title: "転職活動",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "🌳Done",
    tasks: [
      {
        id: uuidv4(),
        title: "読書",
      },
    ],
  },
];

// dummyData[0]["tasks"][dummyData[0]["tasks"].length] = { id: uuidv4(), title: "筋トレ" };

// let dummyDataJson = JSON.stringify(dummyData);

// localStorage.setItem("jsonObject", dummyDataJson);

export default dummyData;
