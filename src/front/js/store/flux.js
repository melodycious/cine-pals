import { useNavigate } from "react-router-dom";


const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      usuario: {},
      lista: {},
      listas: [],
      userId: "",
      token: "",
    },
    actions: {
      
      /* ESTE ES EL REGISTRO */

      getCrearUsuario: async (email, password) => {
        const myHeaders = new Headers();
        myHeaders.append(
          "Cookie",
          ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxO30RoRPnzCyE2EvGPJ2_lFViz1YIAA-jEUGdcdelZBYTQFl53QaWCjaNhnc2kzjFZIutFf5dUAAWGas4QGqMYkD6-wtQAAHE-IPzWo7LDgT1Ea-RmCRJdbdxk_RdNt2gPZ66txhUxSwQ1fHqgIcKrd89ghUAXyX7WkcUFPLzG_cnv7lTaEKxks4QvxrspvZg1AE2i0QDzFit-umbebIcrlfLZe8r04ZvQ6hkZV8pX37qWVVq0szpedgLuqDzXy_Do9qRTSSdBd-OGc02pgmbH5lvNWumyipLPGw2ne3J8Q_21tzj6rng_EoSxiSIFZucLlZgT4BMX1Itcb97xfhUv19mHWH_T2bO3y8hfwEtA97-lzMdwKecrbR7JX94QLgeV8aSsiRfBkjEVYYjml51wJx3Mnst8kgzOBSWmSiqPb9Sk7zHh6bLnFfj_aNJmFEgc4Bc-O0E14rAxhDGpvx21iDc9vZ-bgFBsaGhe-7xEZQNLA8rvpxvcOY1Xg-NBXijVBYAmx9Y0WvA-L0w3FQPfHLJV3iNfr6pK6lwQyVz2YgRSYf3KmWcFqMo-nJC_FF757_XwlppbZyiIpXVYtWavlpNefyO4Hax3mxAMqDO32RSjdLCVnbXjqLplAUX2CvFf8Sy6rheHXgfgtVwPv-IH8s7lUtZZTkui3jtUWVDmuHrUlNzT7PHEs4-q3EwDehyjXQXbllqqKeXyzCjwq4rO56KBodCSgQ6Nyf3VLGy7p6SjjKFn2SN2I-doBCg0KAJ4PBLrbtMbhdwPbGBnehpoW93GQZY1BURjA4DR_6COupJZKv2vGRBZEyl05XtxY-4gNBqRWDpZVkDCFpwSgkDWwFdx7EciiP5YX_3N-JFucwDaTvWH3m9nSG63QQ200UDFy8jR89kUCDklNOR7QTa79UImovl1G9A0zdlAG9UAoAS7ROKCSZtYcRVVH2veqwdsakViRZ5sLkgRObMWc-lwn"
        );
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          email: email,
          password: password,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch(
          `${process.env.BACKEND_URL}/api/signup`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      },

      /* ESTE ES EL LOGIN */

      getLogin: async (email, password) => {
        console.log(email, password)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
            email: email,
            password: password,
        });
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
    
        await fetch(
            `${process.env.BACKEND_URL}/api/login`,
            requestOptions
        )
        .then((response) => response.json())
        .then((result) => {
            setStore({ token: result.access_token, userId: result.userId });
            console.log('result: ' + JSON.stringify(result));
            // Llamar a getTraerUsuario justo después de obtener el token y el userId
            getActions().getTraerUsuario(result.userId);
        })
        .catch((error) => console.log("error", error));
    },

      /* ESTE ES EL LOGOUT */

      getLogout: async (navigate, token) => {
        console.log("Saliendo");
        console.log(token);

        setStore({ token: "" });
        navigate("/login");
      },



      getTraerUsuario: async () => {
        const store = getStore();
        const token = store.token;
        const userId = store.userId;
    
        console.log("store:", store);
        console.log("Token:", token);
        console.log("User ID:", userId);
    
        if (!userId) {
            console.error("userId is not defined");
            return;
        }
    
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
    
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
    
        try {
            const response = await fetch(
                `${process.env.BACKEND_URL}/api/users/${userId}`,
                requestOptions
            );
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("User data:", data);
            setStore({ usuario: data });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    },

      getEditUser: async (id, nombre, email, password) => {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxOnQLzo-WJT0sdNJZNG7IgDqzf0wx2UZHMzZR7RT1nhj0nL-YWwVG3-6OezD5YyZU-yGJ-oLH0l59d7K3yqi1qPUhFDQR7qemGeagONwwzHiwMP_J6ygdX3kyv-ZbLpkaXpKct2nK31pQ3W0CAe6E53vJgkkD5OwK8unsX01i9OoOpc8Nq3K2QiCJi2-v3dXCjiN9I_aIjFXasSUpWzfmNrY-wb3pnWOk50P-oB6YDI9sKg9rOSAA2saBKqE26Xdy2cLLEcOGx6JOpD61bEKvf2zyljqMFC8KKDzNUHDNYa7UoMCZfaasXiTmKiLpfRomvnyvSlDEKJU9CVf9FYTWnoXxUvUxT87NwcsCU4rcXK3iZTfH4D-y8HNKJmgs5b9xYX7ObkSceZ3fc3lLeTR5UbgFLpC_oAQzC83xZdyoi2CcvuDttZxvZlZp-BQeK914GtjsUMOX52Z11jYYt1K2VYT3kfE6neBVCYRsOUEph1hH1vUO9VrHCNXgo8CX41VFvG-AptW4VfGd_hMsMNDuwra20aE7BMRr_b2MFv5DkDtGOvR6pwxnFZe1pWlqPsl3RKRnJcQjzLZDp8AIbw-xjvr04pd7vakywW3VX57OtjrljsMwjDcfqNjZwfcbGGNcC834e-PWgP1RwDIJImHStWHosYE3i5G6139n5SFYLp6gTdpxU1trh1aVJk5K3ov0S4L6t4sXQDZmMJfB-JPyKFcrOmYKuyzkA6PjRyWDzpXQIQd_HOhyxUIiiHt3WF7PE93KOcJ3mlRvS1fxr662rf7i2PFAJaM5XnArnrEuN4qlMd9iki6lATuYU2omXlbVTidSjTx_eag_nyXEfJdysUTa4fMKExJqEzzRv0rYkRMSE-PhbjAHUxQBHisVdTcdJ_Fmf2tDRAHzZsgupUeI3BHwjuK-B4T4lzwAyi3ReDNPgXnImSfn9vLW_2VzDfa0X9JIvcT9d-ZUY8EUotGQGa");

            const raw = JSON.stringify({
              "email": email,
              "password": password,
              "name": nombre
            });

            const requestOptions = {
              method: "PUT",
              headers: myHeaders,
              body: raw,
              redirect: "follow"
            };

            fetch(`https://psychic-space-carnival-x55p5rqv6wvxc6gr7-3001.app.github.dev/api/users/${id}`, requestOptions)
              .then((response) => response.text())
              .then((result) => setStore({ usuario: result }))
              .catch((error) => console.error(error));

      },

      getDeleteUser: async (id) => {
        const myHeaders = new Headers();
          myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxORm-9RVJfLsAAtN5lJiZYaB2XUzMRB5Zdr_Iw1KrO0yFWAzzt-zLjcTqenqh2VivhDRmQp-r_q1nVh0-RWYojbiNAXJEGXBiyrualJseX-5N-7Z9BSE_caxVtu8LtDBh7UVckO3dKZh_HSU21SrE5kSa5HW7jmJMM-Pk5_mlp_AZE8t5GOy9H1UfmXHxDBhx97xQMAq2jZIfaqQ0iQcQaabhUWFqdgX9qODzUAn9AkP-TGBnw38BVoEDOF2t1ZUeUoQ9zanuFZr14fnJACKrzpolhZjWPPkEtFokqEOqid2dgnqhFnUliVd-Bzdci3VyjYrG7EWDtqIcWTrxg8tb-wY1Re_hG_3XezLPeKf9ap9qicWZdAfGHOsJGUrFDPbOGSSX3e39M30UHlYyf7hphGlghcXAJqThQtBX1I8MA93TVyqEFi4UfZaoZHmecgecRyqRFisHtRVoKLLfg5DEgbRVDVSpUoJVaVZ9BBem-jRkXrDkUeTRyb7OwDLsiFFZ_bfHFTsH34qsWcuNsk5mRhx5drKK4qw4T37yo6fQRYUGWvPFqzGD647wT-Qhb8yvA5RoRC9ef1Vj7i6rY5dT6o6rzBEvL5Pm3AxLmAwSj2JyEjdWPefHeRDxabbDSV6kSfdjYFFijLRIyYTpU5oZAmsYiUQKU24g-epvrjqNJJaFp7f58MKYIFppIdkscG7oQHY15yvgOgJNbaJmPUv0SD3KlZtaZBoMIkt6Dqr4CjDKUt1ImlDbS8q1X--mIR3Z6Go04cl_qUnsiINVedkIgpEWOgUxxMxS6F87iBD1qNEfNLwELe9Uxh4teiocBCgSdqJmsi23Vsjq7JItFPAQSY2IyFHx4bDiT0OYKSjP8ZzNgNkGq894Nd_QxFgGVfh2U_tX_8cD6RaKA3uTYRrqBUWXhc0PYN8gJ_ps0umQWuClGFM1vm2F_s0WHpmwKpttqW-8z7M1vzTCvBEbwXM25P");

          const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
          };

          fetch(`https://psychic-space-carnival-x55p5rqv6wvxc6gr7-3001.app.github.dev/api/users/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => setStore({ usuario: result }))
            .catch((error) => console.error(error));
      },


        getCrearLista: async (name) => {
          const store = getStore();
          const token = store.token;
      
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${token}`);
      
          const raw = JSON.stringify({
              name: name,
          });
      
          const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
          };
      
          fetch(`${process.env.BACKEND_URL}/api/lists/${store.userId}`, requestOptions)
              .then((response) => response.json())
              .then((result) => setStore({ lista: result }))
              .catch((error) => console.error(error));
      },
        
      getEditarLista: async (name, id) => {
        const store = getStore();
        const token = store.token;
    
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
    
        const raw = JSON.stringify({
            name: name,
        });
    
        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
    
        fetch(`${process.env.BACKEND_URL}/api/lists/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    },

    getEliminarLista: async (id) => {
      const myHeaders = new Headers();
      myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxMP3HDuOn0OeJUmAsBFU4_oIJaHUo7pzWgZsLjbE9coCfVPxr9rN03_gw572Y2NB66UJBeCAt6ex-5B08PR1oP8_s9gVUq4dRhbhiS2K-X7jVnoZFi_hHRQn7P-m7dab83AkQ4YSAinA0bZn6R5YFkaWuUsWD0yr2rNZJE5TFyoSedKdIB9L7sPDUfB0M1U7rP4XBdCC5ySmdJ4yYdGGbTvZGvmvNvnoZ5IG1z1v7KPSbM-agVgHNxmBKUvYgI2fDYjuckTXt-ABkkmANTjHjWa0dYZDolwhqXaZPX7mU2ShhqjgI9R76MQi-cLInTlgH67YvSGZe7I2Mzsa0X0un556Vm7Oq1dOZqP74DVehq_hFRXys0hLP4YyBPTc3kEdnP8TkDo9Gk9bJOUhqU4BoZudIFddR2poIzLVPljksrg9I10BRk6hiRc2XJGVX4_14zD98iGEd2Hjb5F3zG9a8VtPAWW1ngcKRU2rSJ90tpDyWn5IfOdvtgeua8seem3ysTK1Vp0BZU8JrxvUK4n8baLW449OXUqs7nDBVMTHatg0ayZmOFwxfeIOvP75s86HablgHtsfqE_1-4ZtdmRrXMBWq8pFwv9O4MUEdJ5eZVIFCTSGdqGbeKv53XslA31iY6jOWY2nJ5BaAQ8NQthv3f8Sa6TA4pbKfpvbjX2EmB6uCj4P-asNz2RxSKD7iNAnxJ13_1Z95JHenm47s-Siw0TA_wxMFCCwZ_GbrgcTR8mhW_aEkNgXIANgQI4dqOmek4FdKSU_7J4jTL8k3-sDM91A6VAYarBWFIB601fublEul3P_hPYqUmBefWvYPlVGzc72s8lCLFMw4jH_ft5imN6yMnblTfyCnlCeJZYwhC1iD0TCpTbBCdOK_mUd3VQUftp7fn4SMTWf6KGNpsqCd4vkTfVHZ1aJx8ZW87q_ftMYhHO-Ft6gtxDNxCmFgoaUHUYG3O4h0gqddw_YqCDMR3rT6prGOcWombYM-vpEhXLrw");

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
      };

      fetch("https://psychic-space-carnival-x55p5rqv6wvxc6gr7-3001.app.github.dev/api/lists/7", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

    },





      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
