import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>{/* /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <h1 className='container text-center'>Đây là DASHBOARD, không phận sự thì <br /> <a href="http://localhost:5173/">CÚT!!!!</a></h1>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
      
    </div>
  )
}

export default Dashboard