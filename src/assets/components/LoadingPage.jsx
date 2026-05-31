import { DNA } from 'react-loader-spinner';
import Navbar from './NavBar/Navbar';
export default function LoadingPage() {
  return (
    <main className="font-DM_Sans p-8 h-dvh bg-Neutral_900 text-baseSize text-neutral-50">
      <Navbar />
      <section className="flex justify-center items-center h-full">
        <DNA
          visible={true}
          height="280"
          width="280"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </section>
    </main>
  );
}
