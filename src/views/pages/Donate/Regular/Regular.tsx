import { Header } from "~/components/Header/Header";
import { BackButton } from "~/views/components/BackButton";
import { SettingsButton } from "~/views/components/SettingsButton";
import classes from "../Donate.module.scss";
import { Wheel } from "~/components/Wheel/Wheel";
import { useState } from "react";
import { Icon } from "@iconify/react";

const SUPPORT_OPTION = {
  "0.5K": <Icon width="2em" height="2em" icon="hugeicons:coffee-02" />,
  "1K": <Icon width="2em" height="2em" icon="pepicons-pencil:electricity" />,
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
        <Wheel
          className={classes.supportWheel}
          options={SUPPORT_OPTION}
          value={support}
          onSelect={(e) => setSupport(e.value)}
          size="L"
        />
        <p>
          Помогите сайту расти и работать без рекламы и внесите свой вклад в
          создание новых тренажёров.
        </p>
        <ul>
          <li>
            <b>
              <Icon
                inline
                width="2em"
                height="2em"
                icon="hugeicons:coffee-02"
              />
            </b>
            <p>Оплатить чашку крепкого кофе.</p>
          </li>
          <li>
            <b>
              <Icon
                inline
                width="2em"
                height="2em"
                icon="pepicons-pencil:electricity"
              />
            </b>
            <p>Оплатить часть месячных расходов на электричество.</p>
          </li>
        </ul>
      </main>
    </>
  );
};

export default Regular;
