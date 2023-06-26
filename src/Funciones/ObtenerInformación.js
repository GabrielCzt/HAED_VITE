import Cookies from "universal-cookie";

const cookie = new Cookies();

const fetchData = async () => {
  try {
    const token = cookie.get("token");
    const url = "http://api-haed.danielreyesepitacio.cloud/api/users/info";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData;
    } else {
      return error;
    }
  } catch (error) {
    return error;
  }
};

export default fetchData;
