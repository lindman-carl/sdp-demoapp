import About from "./components/About";
import Upload from "./components/Upload";

const App = () => {
  return (
    <>
      <main
        className="
        w-full h-full
        flex flex-col justify-start items-center gap-y-8
        p-8
        text-tm-white
        font-interstate
        "
      >
        <h1
          className="
          flex flex-row justify-start items-center gap-x-2
          text-4xl font-bold
          "
        >
          <img
            src="/sdp.png"
            alt="Secure Documents Pipeline logo"
            className="
          w-40 h-40 
          mr-2 
          
          "
          />
          <ul>
            <li>Secure</li>
            <li>Documents</li>
            <li>Pipeline</li>
          </ul>
        </h1>
        <Upload />
        <About />
      </main>
      <footer
        className="
        w-full h-16
        text-xs text-tm-white font-bold
        flex flex-row justify-center items-center
        "
      >
        <span>Carl Lindman | AFRY {new Date().getFullYear()}</span>
      </footer>
    </>
  );
};

export default App;
