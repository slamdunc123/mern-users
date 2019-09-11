import React from 'react';

const Home = () => {
  return (
    <div>
      <br />
      <h5>Git URL</h5>
      <ul>
        <li>
          <a
            href='https://github.com/slamdunc123/mern-users'
            target='_blank'
            rel='noopener noreferrer'
          >
            https://github.com/slamdunc123/mern-users
          </a>
        </li>
      </ul>

      <h5>Features:</h5>
      <ul>
        <li>Show all users</li>
        <li>Create user</li>
        <li>Update user</li>
        <li>Delete user</li>
      </ul>
      <br />
      <h5>Tech:</h5>
      <ul>
        <li>react</li>
        <li>mongoDB</li>
        <li>espress</li>
        <li>node.js</li>
        <li>reactstrap - modals</li>
        <li>react-router - routing</li>
        <li>axios - get initial data from api</li>
        <li>redux - state management</li>
        <li>redux-thunk - middleware</li>
        <li>bootstrap - styling and tables</li>
      </ul>
      <br />
    </div>
  );
};

export default Home;
