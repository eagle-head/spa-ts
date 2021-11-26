import { Fragment, FC } from "react";
import { RebelBrands } from "../assets/svg";

const App: FC = () => {
  return (
    <Fragment>
      <h1>Hello World</h1>
      <RebelBrands
        width="100px"
        height="100px"
        title="Rebel Brand"
        titleId="rebel-brand"
        color="#0375ad"
      />
      <h2>Hello world again</h2>
    </Fragment>
  );
};

export default App;
