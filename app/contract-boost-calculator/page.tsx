"use client";

import { useEffect, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import { CustomNumberInput, CustomSelectInput } from './components/CustomInput';

import styles from './styles.module.css';

export default function ContractBoostCalculator() {
  const [formState, setFormState] = useState(() => {
    const savedFormState = localStorage.getItem('formState');
    return savedFormState ? JSON.parse(savedFormState) : formInitialState;
  });

  useEffect(() => {
    console.log('formState changed', { formState });
    localStorage.setItem('formState', JSON.stringify(formState));
  }, [formState]);

  const improvedIhr = formState.ihr * formState.chalice * formState.tachPrismMultiplier * formState.boostBeaconMultiplier * (Math.pow(1.02, formState.t2LifeStonesCount) * Math.pow(1.03, formState.t3LifeStonesCount) * Math.pow(1.04, formState.t4LifeStonesCount));

  const improvedBoostTime = formState.baseBoostTime * formState.boostEventDurationMultiplier * ((Math.pow(1.03, formState.t2DiliStonesCount) * Math.pow(1.06, formState.t3DiliStonesCount) * Math.pow(1.08, formState.t4DiliStonesCount)));

  const population = improvedIhr * improvedBoostTime * formState.monocle * 3 * 4;

  const habSpace = BASE_MAX_HAB_SPACE * formState.gusset;

  const timeToMaxHabsInSeconds = (habSpace / population) * improvedBoostTime * 60;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    console.log('handleChange', { name, value });

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <Tooltip.Provider delayDuration={10}>
      <main className={styles.main}>
        <section>
          <h1>
            Contract Boost Calculator
          </h1>
          <h2>
            Calculates the number of chickens for a boost set. Assumes max ER.
          </h2>
        </section>
        <section>
          <h3>
            Inputs
          </h3>
          <h4>Boost Set Presets</h4>
          <div className={styles.boostBtnContainer}>
            {boostSetPresets.map((preset) => (
              <button key={preset.id} className={styles.boostBtn} title={preset.description}>{preset.name}</button>
            ))}
          </div>
          <div className={styles.boostAndArtifactInputsContainer}>
            <div>
              <Accordion.Root type='single' collapsible>
                <Accordion.Item value='CustomInputs'>
                  <Accordion.Header>
                    <Accordion.Trigger className={styles.AccordionTrigger}>
                      Custom Inputs
                      <ChevronDownIcon className={styles.AccordionChevron} aria-hidden />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className={styles.AccordionContent}>
                    <div className={styles.inputContainer}>
                      <label htmlFor="tachPrismMultiplier">
                        Tachyon Prism Multiplier (Multiple of these will stack additively)
                      </label>
                      <CustomNumberInput name='tachPrismMultiplier' value={formState.tachPrismMultiplier} handleChange={handleChange} />
                    </div>
                    <div className={styles.inputContainer}>
                      <label htmlFor="boostBeaconMultiplier">
                        Boost Beacon Multiplier (Multiple of these will stack additively)
                      </label>
                      <CustomNumberInput name='boostBeaconMultiplier' value={formState.boostBeaconMultiplier} handleChange={handleChange} />
                    </div>
                    <div className={styles.inputContainer}>
                      <label htmlFor="baseBoostTime">
                        Base Boost Time (minutes)
                      </label>
                      <CustomNumberInput name='baseBoostTime' value={formState.baseBoostTime} handleChange={handleChange} />
                    </div>
                    <div className={styles.inputContainer}>
                      <label htmlFor="boostEventDurationMultiplier">
                        Boost Event Duration Multiplier
                      </label>
                      <CustomNumberInput name='boostEventDurationMultiplier' value={formState.boostEventDurationMultiplier} handleChange={handleChange} />
                    </div>
                    <div className={styles.inputContainer}>
                      <label htmlFor="ihr">
                        IHR (You probably don't need to change this)
                      </label>
                      <CustomNumberInput name='ihr' value={formState.ihr} handleChange={handleChange} />
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="monocle">
                Monocle
              </label>
              <CustomSelectInput name='monocle' options={monocleOptions} value={formState.monocle} handleChange={handleChange} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="chalice">
                Chalice
              </label>
              <CustomSelectInput name='chalice' options={chaliceOptions} value={formState.chalice} handleChange={handleChange} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="gusset">
                Gusset
              </label>
              <CustomSelectInput name='gusset' options={gussetOptions} value={formState.gusset} handleChange={handleChange} />
            </div>
          </div>
          <div className={styles.stonesInputsContainer}>
            <div>
              <p>Enter the no. of each type of life stones equipped</p>
              <div>
                <label htmlFor="t2LifeStonesCount">
                  T2
                </label>
                <CustomNumberInput name='t2LifeStonesCount' value={formState.t2LifeStonesCount} handleChange={handleChange} />
                <label htmlFor="t3LifeStonesCount">
                  T3
                </label>
                <CustomNumberInput name='t3LifeStonesCount' value={formState.t3LifeStonesCount} handleChange={handleChange} />
                <label htmlFor="t4LifeStonesCount">
                  T4
                </label>
                <CustomNumberInput name='t4LifeStonesCount' value={formState.t4LifeStonesCount} handleChange={handleChange} />
              </div>
            </div>
            <div>
              <p>Enter the no. of each type of dilithium stones equipped</p>
              <div>
                <label htmlFor="t2DiliStonesCount">
                  T2
                </label>
                <CustomNumberInput name='t2DiliStonesCount' value={formState.t2DiliStonesCount} handleChange={handleChange} />
                <label htmlFor="t3DiliStonesCount">
                  T3
                </label>
                <CustomNumberInput name='t3DiliStonesCount' value={formState.t3DiliStonesCount} handleChange={handleChange} />
                <label htmlFor="t4DiliStonesCount">
                  T4
                </label>
                <CustomNumberInput name='t4DiliStonesCount' value={formState.t4DiliStonesCount} handleChange={handleChange} />
              </div>
            </div>
          </div>
        </section>
        <section>
          <h3>Results</h3>
          <div>
            {/* Improved IHR is incorrect */}
            {/* <p>Improved IHR: {Math.round(improvedIhr)?.toLocaleString()} Min/Hab</p> */}
            <p>Improved Tachyon boost time: {Math.floor(improvedBoostTime)} mins {Math.floor(improvedBoostTime * 60 % 60)} seconds </p>
            <p>Population (online): {(Math.round(population / 3))?.toLocaleString()} chickens</p>
            <p>Population (offline): {Math.round(population)?.toLocaleString()} chickens</p>
            <p>Max hab space: {Math.round(habSpace)?.toLocaleString()}</p>
            <p>Maxed habs? {population > habSpace ? 'Yes ✔' : 'No ❌'}</p>
            <p><b>Time to max. habs: </b>{population > habSpace ? `${Math.floor(timeToMaxHabsInSeconds / 60)} mins ${Math.floor(timeToMaxHabsInSeconds % 60)} seconds` : `Habs won't be full at the end of the boost`}</p>
          </div>
        </section>
        <section className={styles.footerSection}>
          <p>Heavily inspired by <a href="https://hashtru.netlify.app/contractboost" target="_blank">hashtru's Contract Boost Calculator</a></p>
        </section>
      </main>
    </Tooltip.Provider>
  )
}

const BASE_MAX_HAB_SPACE = 11340000000;


const monocleOptions = [
  {
    value: 1,
    text: "None",
  },
  {
    value: 1.05,
    text: "T1",
  },
  {
    value: 1.10,
    text: "T2",
  },
  {
    value: 1.15,
    text: "T3",
  },
  {
    value: 1.15,
    text: "T4",
  },
  {
    value: 1.25,
    text: "T4E",
  },
  {
    value: 1.30,
    text: "T4L",
  },
];

const chaliceOptions = [
  {
    value: 1,
    text: "None",
  },
  {
    value: 1.05,
    text: "T1",
  },
  {
    value: 1.10,
    text: "T2",
  },
  {
    value: 1.15,
    text: "T2E",
  },
  {
    value: 1.20,
    text: "T3",
  },
  {
    value: 1.23,
    text: "T3R",
  },
  {
    value: 1.25,
    text: "T3E",
  },
  {
    value: 1.30,
    text: "T4",
  },
  {
    value: 1.35,
    text: "T4E",
  },
  {
    value: 1.40,
    text: "T4L",
  },
];

const gussetOptions = [
  {
    value: 1,
    text: "None",
  },
  {
    value: 1.05,
    text: "T1",
  },
  {
    value: 1.10,
    text: "T2",
  },
  {
    value: 1.12,
    text: "T2E",
  },
  {
    value: 1.15,
    text: "T3",
  },
  {
    value: 1.16,
    text: "T3R",
  },
  {
    value: 1.20,
    text: "T4",
  },
  {
    value: 1.22,
    text: "T4E",
  },
  {
    value: 1.25,
    text: "T4L",
  },
];

const formInitialState = {
  tachPrismMultiplier: 1000,
  boostBeaconMultiplier: 10,
  baseBoostTime: 10,
  boostEventDurationMultiplier: 1,
  ihr: 7440,
  monocle: monocleOptions[0].value,
  chalice: chaliceOptions[0].value,
  gusset: gussetOptions[0].value,
  t2LifeStonesCount: 0,
  t3LifeStonesCount: 0,
  t4LifeStonesCount: 0,
  t2DiliStonesCount: 0,
  t3DiliStonesCount: 0,
  t4DiliStonesCount: 0,
};

const boostSetPresets = [
  {
    id: '1',
    name: '8 token',
    description: '8 token boost set - 1000x legendary (10 mins) tachyon prism and 10x boost beacon'
  },
  {
    id: '2',
    name: '6 token (dubson)',
    description: '6 token boost set - 1000x legendary (10 mins) tachyon prism and two of the 2x (30 mins) boost beacon'
  },
  {
    id: '3',
    name: '6 token (dubson supreme)',
    description: '6 token boost set - 1000x supreme (1 hour) tachyon prism and two of the 2x (30 mins) boost beacon'
  },
  {
    id: '4',
    name: '5 token (benson supreme)',
    description: '6 token boost set - 1000x supreme (1 hour) prism and two of the 2x boost beacon'
  },
  {
    id: '5',
    name: '4 token (epic)',
    description: '4 token boost set - Two 100x epic prism'
  },
  {
    id: '6',
    name: '4 token (supreme)',
    description: '4 token boost - 1hour 1000x legendary supreme prism'
  },
];

// Works only for simple objects with no nested objects
const isEqual = (obj1: any, obj2: any) => {
  return Object.entries(obj1).every(([key, value]) => obj2[key] === value);
}