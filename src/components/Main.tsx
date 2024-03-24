import Header from "@components/Header.tsx";
import { FiMap } from "solid-icons/fi";
import Card from "./Card.tsx";

export default function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

function Main() {
  return (
    <div class="w-full">
      <div class="flex gap-4 max-w-screen-xl px-4 py-2 mx-auto">
        <div class="flex flex-col basis-2/3">
          <div class="flex gap-2 items-center w-fit text-black text-3xl font-bold">
            <FiMap /> 
            <h1>Find a Doctor Near You</h1>
          </div>
          <Map />
        </div>
        <div class="flex flex-col basis-1/3">
          <DoctorList />
        </div>
      </div>
    </div>
  )
}

function Map() {
  // big square of 200px by 300px
  return (
    <div>
      <div class="bg-gray-200 h-[200px] w-[300px] rounded-md">
        <p>Map goes here</p>
      </div>
    </div>
  )
}

function DoctorList() {
  return (
    <div>
      <Card>
        <h3>Dr. John Doe</h3>
        <p>Specialty: Cardiology</p>
        <p>Location: 123 Main St.</p>
      </Card>
    </div>
  )
}
