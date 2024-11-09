import { Header } from "src/components/Header/Header";
import { BackButton } from "src/views/components/BackButton";
import { SettingsButton } from "src/views/components/SettingsButton";
import classes from "../Donate.module.scss";
import { Wheel } from "src/components/Wheel/Wheel";
import { useState } from "react";

const SUPPORT_OPTION = {
  "0.5K": "На чашку кофе в самый трудный день - 500₽/месяц",
  "1K": "На покрытие расходов на интернет - 1000₽/месяц",
};

const DEFAULT_SUPPORT_OPTION = "0.5K";

const Regular = () => {
  const [support, setSupport] = useState(DEFAULT_SUPPORT_OPTION);

  return (
    <>
      <Header renderMajorAction={SettingsButton} renderMinorAction={BackButton}>
        Поддерживать регулярно
      </Header>
      <main className={classes.main}>
        <h1>Поддерживаю</h1>
        <p>
          Помогите сайту расти и работать без рекламы и внесите свой вклад в
          создание новых генераторов.
        </p>
        <Wheel
          options={SUPPORT_OPTION}
          value={support}
          onSelect={(e) => setSupport(e.value)}
          size="L"
        />
        <ul></ul>
      </main>
    </>
  );
};

export default Regular;
