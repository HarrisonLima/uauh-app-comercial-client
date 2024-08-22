import { useEffect, useState } from "react";

import useNavigateToLocation from "../../hooks/useNavigateToLocation";

import stagesJSON from "./stages.json";

const ProgressBar = ({ variant, id }: { variant: string; id: string }) => {
  const [stages, setStages] = useState<any>([]);
  const [windowWidth] = useState(window.innerWidth);

  const path = window.location.pathname;

  useEffect(() => {
    setStages(stagesJSON);
  }, []);

  const navigate = useNavigateToLocation();

  const handleNavigate = (to: string) => {
    navigate(to);
  };

  return stages.length > 0 ? (
    <ul className="progress-bar">
      {Object.keys(stages[0]).map((module: string) => {
        if (variant === module) {
          const modules = stages[0][module];
          return Object.keys(modules).map((stage: string, index) => {
            const modulePath = modules[stage];
            return (
              <div key={index + 1} className="progress-bar__item__container">
                <div
                  className="progress-bar__item"
                  aria-disabled={!path.includes(modulePath)}
                  onClick={() => handleNavigate(`${modulePath}/${id}`)}
                >
                  <p
                    key={index + 1}
                    className={`progress-bar__item__index progress-bar__item__index--${
                      path.includes(modulePath) ? "actived" : "inactived"
                    }`}
                  >
                    {String(index + 1)}
                  </p>
                </div>
                <p
                  key={index + 1}
                  data-actived={path.includes(modulePath)}
                  onClick={() => handleNavigate(`${modulePath}/${id}`)}
                >
                  {windowWidth <= 1280 ? `${index + 1}. ${stage}` : stage}
                </p>
              </div>
            );
          });
        } else {
          return null;
        }
      })}
    </ul>
  ) : null;
};

export default ProgressBar;
