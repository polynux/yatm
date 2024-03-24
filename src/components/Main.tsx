import Header from "@components/Header.tsx";
import { FiMap } from "solid-icons/fi";
import Card from "./Card.tsx";

import { db, Praticiens } from "astro:db";
import { createResource, createSignal, Match, Show, Switch } from "solid-js";

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
  return (
    <div>
      <div class="bg-gray-200 h-[200px] w-[300px] rounded-md">
        <p>Map goes here</p>
      </div>
    </div>
  )
}

async function getDoctors() {
  const doctors = await db.select().from(Praticiens).limit(10).execute();
  return doctors ?? [];
}

function DoctorList() {
  const [doctorList] = createResource(getDoctors);
  

  return (
    <div>
      <Show when={doctorList.loading}>
        <p>Loading...</p>
      </Show>
      <Switch>
        <Match when={doctorList.error}>
          <p>Error loading doctors</p>
        </Match>
        <Match when={doctorList()}>
          <div class="flex flex-col gap-2">
            {doctorList()?.map((doctor) => (
              <Card>
                <h3><strong>Nom :</strong> {doctor.name} {doctor.firstname}</h3>
                <p><strong>Spécialté :</strong> {doctor.profession}</p>
                <p><strong>Lieu :</strong> {doctor.address}, {doctor.zip} {doctor.city}</p>
                <p><strong>Note :</strong> {doctor.description}</p>
              </Card>
            ))}
          </div>
        </Match>
      </Switch>
    </div>
  )
}
