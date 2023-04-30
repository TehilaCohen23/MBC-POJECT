import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <>
      <small className="footer text-secondary text-opacity-75">
        Created by Tehila Cohen in 2023
      </small>
    </>
  );
};

export default Footer;
