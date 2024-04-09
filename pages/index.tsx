import Head from "next/head";
import { useWakuNode } from "../context/waku/useWakuNode";

function Home() {

  const { connected } = useWakuNode();

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
        </nav>
      </header>

      <main>
        {connected && (
          <div>
            <h1>Peer is connected</h1>
          </div>
        )}
        {!connected && (
          <div>
            <h1>Peer disconnected</h1>
          </div>
        )}
      </main>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
