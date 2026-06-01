import Navbar from './NavBar/Navbar';
import Error from '../images/icon-error.svg';
import RetryIcon from '../images/icon-retry.svg';
export default function Retry({ setRetryCount, setError }) {
  return (
    <main className="font-DM_Sans p-8 h-dvh bg-Neutral_900 text-baseSize text-neutral-50">
      <Navbar />
      <section className="mt-16 flex gap-4 flex-col items-center justify-center">
        <div className="w-full">
          <img className="w-8 m-auto" src={Error} alt="" />
        </div>
        <h1 className="text-4xl font-extrabold">Something went wrong</h1>
        <p className="text-neutral-400 text-sm w-1/2 text-center leading-5">
          We couldn't connect to the server (API error). Please try again in a
          few moments.
        </p>
        <button
          onClick={() => setError(false)}
          className="cursor-pointer active:scale-95 p-1.5 gap-1.5 rounded-lg flex bg-Neutral_700"
        >
          <img src={RetryIcon} alt="" />
          <p className="text-sm">Retry</p>
        </button>
      </section>
    </main>
  );
}
