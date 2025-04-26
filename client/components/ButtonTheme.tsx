import { useUserConfig } from "@/contexts/config";
import { UserTheme } from "@/models/IUserConfig";
import React from "react";

interface ButtonThemeProps {
  className?: string;
  style?: React.CSSProperties;
}

const ButtonTheme: React.FC<ButtonThemeProps> = ({ className, style }) => {
  const { userConfig, setUserConfig } = useUserConfig();

  const showLight = userConfig.theme === UserTheme.light;

  const onClick = () => {
    setUserConfig({
      ...userConfig,
      theme: showLight ? UserTheme.dark : UserTheme.light,
    });
  };

  return (
    <button onClick={onClick} className={className} style={style}>
      {showLight ? (
        <i className="bi bi-brightness-high"></i>
      ) : (
        <i className="bi bi-brightness-high-fill"></i>
      )}
    </button>
  );
};

export default ButtonTheme;
