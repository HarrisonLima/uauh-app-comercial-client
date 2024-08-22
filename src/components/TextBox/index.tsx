import { useState } from "react";

import IEvents from "../../interfaces/IEvents";

import Text from "../Text";
import Colors from "../../utility/Colors";

interface IHeader {
  [key: string]: string;
}

const TextBox = ({
  content,
  editable = false,
  header,
  theme = "default",
  noMessage = false,
  onChange,
}: {
  content?: string;
  editable?: boolean;
  header: IHeader[];
  theme?: "alert" | "danger" | "disabled" | "default" | "sucess" | string;
  noMessage?: boolean;
} & IEvents) => {
  const [message, setMessage] = useState();

  return (
    <div className={`text-box text-box--${theme}`}>
      <div className={`text-box__header text-box__header--${theme}`}>
        {header.map((item, index) => {
          const key = Object.keys(item)[0];
          const value = item[key];
          return (
            <span className="text-box__header__item" key={index}>
              <p>{key}</p>
              <p>{value}</p>
            </span>
          );
        })}
      </div>
      {!noMessage && (
        <textarea
          className="text-box__message"
          value={content ? content : message}
          readOnly={editable && content ? true : false}
          onChange={(event: any) => {
            onChange ? onChange(event.target.value) : null;
            setMessage(event.target.value);
          }}
        />
      )}
    </div>
  );
};

export default TextBox;
