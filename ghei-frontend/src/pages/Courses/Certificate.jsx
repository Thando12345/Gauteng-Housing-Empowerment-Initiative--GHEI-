import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Certificate() {
  const { id } = useParams();
  const { user } = useAuth();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const certificateRef = useRef();

  useEffect(() => {
    fetchCertificate();
  }, [id]);

  const fetchCertificate = async () => {
    try {
      const response = await fetch(`/api/courses/${id}/certificate/${user.id}`);
      if (!response.ok) throw new Error('Failed to fetch certificate');
      const data = await response.json();
      setCertificate(data);
      setLoading(false);
    } catch (error) {
      setError(error.message || 'Failed to load certificate');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const certificateElement = certificateRef.current;
    if (!certificateElement) return;

    // Use html2canvas or similar library to convert the certificate to an image
    // This is a placeholder for the actual implementation
    alert('Certificate download started');
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!certificate) return <div>Certificate not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg overflow-hidden" ref={certificateRef}>
          <div className="px-8 py-12 text-center">
            <div className="border-4 border-gray-900 p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Certificate of Completion</h1>
              <p className="text-xl text-gray-700 mb-4">This is to certify that</p>
              <p className="text-3xl font-bold text-gray-900 mb-4">{certificate.userName}</p>
              <p className="text-xl text-gray-700 mb-8">has successfully completed the course</p>
              <p className="text-2xl font-bold text-indigo-600 mb-8">{certificate.courseName}</p>
              <p className="text-lg text-gray-700 mb-4">
                Completed on {new Date(certificate.completionDate).toLocaleDateString()}
              </p>
              <div className="mt-12 flex justify-between items-center">
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-500">Certificate ID</div>
                  <div className="text-sm text-gray-900">{certificate.id}</div>
                </div>
                <div className="text-right">
                  <img
                    src={certificate.signature}
                    alt="Signature"
                    className="h-12 inline-block mb-2"
                  />
                  <div className="text-sm font-medium text-gray-900">Course Instructor</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

export default Certificate;