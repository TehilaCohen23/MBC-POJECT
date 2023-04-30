import { FunctionComponent, useEffect, useState } from "react";
import { getUserProfile } from "../services/UsersService";
import User from "../interfaces/Users";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  let [details, setDetails] = useState<User>();
  let [businessUser, setBusinessUser] = useState<boolean>(false);

  useEffect(() => {
    getUserProfile()
      .then((res) => {
        setDetails(res.data);
        if (res.data.biz) {
          setBusinessUser(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {
        <div className="container mt-9 col-md-9 text-center">
          <h5 className="display-2 text-center m-5">Your Profile</h5>
          <div className="row">
            {details ? (
              <div className="container">
                <div className="card">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <small className="text-info">Your email: </small>
                      {details.email}
                    </li>

                    <li className="list-group-item">
                      <small className="text-info">Your name: </small>
                      {details.name}
                    </li>

                    {businessUser ? (
                      <li className="list-group-item">
                        <small className="text-info">
                          Your business name:{" "}
                        </small>
                        {details.businessName}
                      </li>
                    ) : (
                      <li className="list-group-item text-info">
                        A user is not a business user
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <p>Unauthorized access</p>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default Profile;
