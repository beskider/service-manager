import Wrench from './wrench.png'

const Main = () => {
  return <>
    <h5 className='text-white bg-dark p-3 mb-3'>
      <img src={Wrench} alt="Wrench" width="30" height="30" /> Service Manager
    </h5>
    <div class="row">
      <div class="col-sm-6">
        <div className="card text-white bg-info">
          <div className="card-header">Zlecenia</div>
          <div className="card-body">
            <h5 className="card-title">Zarządzania zleceniami serwisowymi</h5>
            <p className="card-text text-white">Kliknij poniżej, aby uzyskać dostęp do części aplikacji pozwalającej na podgląd, tworzenie, edycja i usuwanie zleceniami serwisowymi.</p>
            <div className="d-grid gap-2">
              <button className="btn btn-primary" type="button">Zlecenia</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div className="card text-white bg-success">
        <div className="card-header">Klienci</div>
        <div className="card-body">
          <h5 className="card-title">Zarządzanie klientami (zleceniodawcami)</h5>
          <p className="card-text text-white">Kliknij poniżej, aby uzyskać dostęp do części aplikacji pozwalającej na zarządzania danymi klientów serwisu.</p>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="button">Klienci</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
}

export default Main