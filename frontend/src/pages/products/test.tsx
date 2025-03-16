import React, { useEffect } from 'react';
import axios from 'axios';

const Test = () => {
  
  const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MTYxMzEzNDQsImV4cCI6MTcxNjEzNDk0NCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGVzdGVyNEB0ZXN0LmNvbSJ9.HHNfATmb27nUl-5GyZ0cYoUkQOLCFMg4nbBRAXlhCSokgRNsgCtxBxzKmWfQDhdEfGCxrH3XMpHjK-KA4Z4-FwVNKHYrvQlW3Kyu5MVLtcgKmZj3lIJIq4ArxmvAGZw-95TaFbt8TgQxyAsKvyOiIszNfQJeTkxwpqPiIbJXznHjvJe0_eKrTAhlg0-wz26jwiWvUQFBPg54jswSRsOuMR1cQC2ITOzhedkMqoRK5DhBNnfSbjEl9EzpS45PTk1a9NVMLEelXNZdwhrlX02A3-kHwpppyli2NqARmdP-k5b7d68WD3C5YHXFCz3b1OI_qDhHBVQOYgQLmt6qVM8YYbbSw5GzQiKREfWZCdsf9PgefEN1_teEnmPJY1GGdq5xzXRYqVKv3tAYis26gREG_-_ZBd_c7qiBvzNUzvErfLNk_UR4OzGLhsV_Z6ewfbmdlJnbbdiaO0gd_NJxtvi2GC4vhLmAiMROccRSyeqDV6dTsEfV9fxfc7SFig1wi7C29BvUfYtJe-B8M08-O_75BuFBLDYIkmVaSRxeh-nnIgWg_a6SQ0HoFzdb9eEofZL4sUTzQKoZOYsj1OrfuZC2koPWiW5wJnP26VDOo9ArZnWueS2_LBsrb9xi2_j_hM9YWlo9OaINavOvlflzHwtf9Nc3YUmwHXd77eI0HrxFe4U";

  const handlePostRequest = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/carts/22',
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }
      );
      console.log('POST Response:', response.data);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  const handleGetRequest = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/carts', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Accept': 'application/json',
        },
      });
      console.log('GET Response:', response.data);
    } catch (error) {
      console.error('Error making GET request:', error);
    }
  };
  

  return (
    <div>
      <button onClick={handlePostRequest}>POST to /api/carts/22</button>
      <button onClick={handleGetRequest}>GET from /api/carts</button>
    </div>
  );
};

export default Test;
