import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { CChartPie } from '@coreui/react-chartjs';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [urlResults, setUrlResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPhishingCount, setIsPhishingCount] = useState(0);
  const [isSafeCount, setIsSafeCount] = useState(0);
  const [isPhishing, setIsPhishing] = useState(null);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem('urlResults')) || [];
    setUrlResults(storedResults);

    const phishingCount = storedResults.filter(item => item.isPhishing).length;
    const safeCount = storedResults.length - phishingCount;
    setIsPhishingCount(phishingCount);
    setIsSafeCount(safeCount);
  }, []);

  const checkPhishingURL = (url) => {
    const phishingPatterns = [
      "phishing", 
      "scam", 
      "fraud", 
      "wwww", 
      "http://", 
      "@", 
      "%", 
      "#", 
      "&", 
      "\\\\", 
      ".tk", ".ml", ".ga", ".cf", ".gq"
    ];

    const ipAddressPattern = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
    const invalidUrlCharacters = /[^a-zA-Z0-9.-/?:]/g;

    const containsPhishingPattern = phishingPatterns.some((pattern) => url.includes(pattern));
    const containsIPAddress = ipAddressPattern.test(url);
    const containsInvalidCharacters = invalidUrlCharacters.test(url);

    return containsPhishingPattern || containsIPAddress || containsInvalidCharacters;
  };

  const handleSubmit = () => {
    if (!url) return;

    const phishing = checkPhishingURL(url);
    setIsPhishing(phishing);

    // const timestamp = new Date().toLocaleString();
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const newResult = { url, isPhishing: phishing, timestamp };
    const updatedResults = [...urlResults, newResult];

    setUrlResults(updatedResults);
    setUrl('');

    if (phishing) {
      setIsPhishingCount(isPhishingCount + 1);
    } else {
      setIsSafeCount(isSafeCount + 1);
    }

    localStorage.setItem('urlResults', JSON.stringify(updatedResults));
  };

  const filteredResults = urlResults.filter(item =>
    item.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pieChartData = {
    labels: ['Safe', 'Unsafe'],
    datasets: [
      {
        data: [isSafeCount, isPhishingCount],
        backgroundColor: ['#008000', '#FF6384'],
        hoverBackgroundColor: ['#008000', '#FF6384'],
      },
    ],
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h5>Phishing URL Detection</h5>
        </CCardHeader>
        <CCardBody>
          <CFormInput
            type="text"
            placeholder="Enter a website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <CButton color="primary" className="mt-3" onClick={handleSubmit}>
            Check URL
          </CButton>
          
          {isPhishing !== null && (
            <div className={`mt-4 p-3 ${isPhishing ? 'bg-danger' : 'bg-success'} text-white`}>
              {isPhishing ? "This website is NOT SAFE (Phishing URL)" : "This website is SAFE"}
            </div>
          )}
        </CCardBody>
      </CCard>

      <CRow className="mb-4">
        <CCol md={6}>
          <CCard className="bg-success text-white">
            <CCardBody>
              <h5>Safe URLs</h5>
              <p>{isSafeCount}</p>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={6}>
          <CCard className="bg-danger text-white">
            <CCardBody>
              <h5>Unsafe URLs</h5>
              <p>{isPhishingCount}</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <h5 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Checked URLs</h5>
              <CFormInput
                type="text"
                placeholder="Search URLs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-3"
              />
            </CCardHeader>
            <CCardBody>
              <div style={{
                height: '300px',
                overflowY: 'auto',
              }}>
                <CTable align="middle" hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Website URL</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                      <CTableHeaderCell>Timestamp</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredResults.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{item.url}</CTableDataCell>
                        <CTableDataCell className={item.isPhishing ? 'text-danger' : 'text-success'}>
                          {item.isPhishing ? 'Not Safe' : 'Safe'}
                        </CTableDataCell>
                        <CTableDataCell>{item.timestamp}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h5>Phishing URL Details</h5>
            </CCardHeader>
            <CCardBody>
              <div style={{
                height: '350px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <CChartPie data={pieChartData} />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Summary Count Cards */}
      

      {/* URL Results Cards */}
      {/* <CCard className="mb-4">
        <CCardHeader>
          <h5 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>URL Results Cards</h5>
        </CCardHeader>
        <CCardBody>
          <CRow>
            {filteredResults.map((item, index) => (
              <CCol key={index} xs={12} sm={6} md={4} className="mb-3">
                <CCard className={item.isPhishing ? 'border-danger' : 'border-success'}>
                  <CCardBody>
                    <h6>{item.url}</h6>
                    <div className={item.isPhishing ? 'text-danger' : 'text-success'}>
                      {item.isPhishing ? 'Not Safe' : 'Safe'}
                    </div>
                    <div>{item.timestamp}</div>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard> */}
    </>
  );
};

export default Dashboard;
