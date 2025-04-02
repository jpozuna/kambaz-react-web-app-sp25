const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function EnvironmentVariables() {
  return (
    <div id="wd-environment-variables">
      <h3>Environment Variables</h3>
      <div className="list-group">
        <div className="list-group-item">
          <h4>Lab 5 Welcome</h4>
          <p>Remote Server: <a href={REMOTE_SERVER}>{REMOTE_SERVER}</a></p>
          <p>Local Server: <a href="http://localhost:4000">http://localhost:4000</a></p>
        </div>
      </div>
      <hr/>
    </div>
  );
}
