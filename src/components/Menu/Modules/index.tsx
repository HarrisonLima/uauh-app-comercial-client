import { useEffect, useState } from "react";
import useCookies from "../../../storage/Cookies";
import useNavigateToLocation from "../../../hooks/useNavigateToLocation";
import modules from "./modules.json";

const Modules = () => {
  const [accessibleModules, setAcessibleModules] = useState<any>([]);
  const { GET_Profile } = useCookies();
  const profile = GET_Profile();
  const navigate = useNavigateToLocation();

  useEffect(() => {
    setAcessibleModules(modules);
  }, [profile.perfil]);

  const handleClick = (to: string) => {
    navigate(to);
  };

  return accessibleModules.length > 0 ? (
    <nav>
      {Object.keys(accessibleModules[0]).map((section: string) => {
        const sectionModules = Object.keys(
          accessibleModules[0][section]
        ).filter((moduleName: string) =>
          accessibleModules[0][section][moduleName].acess.includes(
            profile.perfil
          )
        );

        if (sectionModules.length > 0) {
          return (
            <ul key={section}>
              <div>
                <h2 className="heading--secondary">{section}</h2>
              </div>
              {sectionModules.map((moduleName: string) => {
                const module = accessibleModules[0][section][moduleName];
                return (
                  <li key={moduleName} onClick={() => handleClick(module.path)}>
                    <h3 className="heading--tertiary">{moduleName}</h3>
                  </li>
                );
              })}
            </ul>
          );
        }
        return null;
      })}
    </nav>
  ) : null;
};

export default Modules;
