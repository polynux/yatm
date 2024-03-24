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
    <div>
      <div class="flex gap-4">
        <div class="flex flex-col">
          <div class="flex gap-2 items-center border-b-2 border-black w-fit">
            <FiMap /> 
            <h1>Find a Doctor Near You</h1>
          </div>
          <Map />
        </div>
        <div class="flex flex-col">
          <DoctorList />
        </div>
      </div>
    </div>
  )
}

function Map() {
  return (
    <div>
      <h2>Map</h2>
    </div>
  )
}

function DoctorList() {
  return (
    <div>
      <h2>Doctor List</h2>
      <Card>
        <h3>Dr. John Doe</h3>
        <p>Specialty: Cardiology</p>
        <p>Location: 123 Main St.</p>
      </Card>
    </div>
  )
}
