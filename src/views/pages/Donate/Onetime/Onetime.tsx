import { Header } from "src/components/Header/Header";
import { BackButton } from "src/views/components/BackButton";
import { SettingsButton } from "src/views/components/SettingsButton";
import classes from "../Donate.module.scss";
import { Wheel } from "src/components/Wheel/Wheel";
import { useState } from "react";

const SUPPORT_OPTIONS = {
  "10K": "10 000₽",
  "3K": "3 000₽",
  "2K": "2 000₽",
  "1K": "1 000₽",
};

const DEFAULT_SUPPORT_OPTION = "1K";

const Onetime = () => {
  const [support, setSupport] = useState(DEFAULT_SUPPORT_OPTION);

  return (
    <>
      <Header renderMajorAction={SettingsButton} renderMinorAction={BackButton}>
        Поддержать разово
      </Header>
      <main className={classes.main}>
        <h1>Поддерживаю!</h1>
        <Wheel
          className={classes.supportWheel}
          options={SUPPORT_OPTIONS}
          value={support}
          onSelect={(e) => setSupport(e.value)}
          size={"L"}
        />
        <ul>
          <li>
            <b>10 000₽ — Вдохновитель</b>
            <p>Вы вдохновляете нас делать проект лучше каждый день!</p>
          </li>
          <li>
            <b>3 000₽ — Благодетель</b>
            <p>Ваша поддержка дает нам возможность развиваться.</p>
          </li>
          <li>
            <b>2 000₽ — Энтузиаст</b>
            <p>
              Этот вклад помогает расширять функционал и добавлять новый
              контент.
            </p>
          </li>
          <li>
            <b>1 000₽ — Поддерживающий</b>
            <p>
              Вы — часть команды, помогающей нашему проекту оставаться
              доступным.
            </p>
          </li>
        </ul>
      </main>
    </>
  );
};

export default Onetime;
