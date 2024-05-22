import { useNavigate } from "react-router-dom";


const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      usuario: {},
      lista: {},
      listas: [],
      userId: {},
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
          .then((response) => {
      
            return response.json();
          })

          .then((result) => {
            setStore({ token: result.token });
            setStore({ userId: result.userId });
            console.log(result);
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



      getInfoUser: async (id) => {
        const myHeaders = new Headers();
          myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxOvPGSzDKJRs6u1Ak71bwSa4k_cr4bUmPK2hzwd1rOjD5OUgE2QYHnVd_gbH-YQFhCplOSGgJTA0QN_fltC2xXR_Bnx81uqaGM0DJFVFSQlPnvSrZtUGf3D5ct2iRrjbA3sliiAvE9cxCYp4MLzyCzGvr7xnZvzJO_T4VLPV1WsS0YgVw_Bi_PVmCBPU95FEfKmr9tH2kMmHJn2SG-iYag0IEH1Hq3P8awoq_fajAbMW2y5VuQIMElo02tgtdvJNk-wkwPyOizAPA3_wp7EjnV_M0yFwILQrH3X3OPkw1Qyj6Lm4D7CMjeuWb1Py0qBIwW_c3YB-Qy5imtTBhWbT-y6FlRm8wBnps04HjzXKebQGj0HNgsMSIRKr33Ast395ubklGviy8tjMpKPDa2y7Of6of0Gx5gttVrifmBMnRUxe6awBf76WY0TjMiZOpZmRw0Jskfp-w6_Gt8a7Kr8nlAXRigWQvSJfXRiueVgDnZbs1NlHUzkOotng0cuuOAEbkJ9oIGrqjwyNDc4MsJNnnr8ENICtNChIfyVYcw5VYHHHmdvMWA6Fu7XyR8Ms_cm2C4PNpr53gLjVOCWOkciMw650Rf3Xx1h4hikOIo5GOzYiS1kdKSHX5lVZ6dJrLUqDyYkfiRKCACnddQ8Kmkkg0DLNjoUgC12wu48wgBaOLIrftp3EkqM6345w3kwTYzOxs1p10GZ4ttZI__YECd2PKkJxDcH0i31IbyKvjtA7WmtoTB5SkyA-_YdtEFdGdC5PePXpNmnxXSX-w_J_Nf0M53-gwfU-tUeLyxaq7LAMjWEfquhQlDaR1QL7jF5-tm2N3IeqzKmFWLWIcD6d9QDnoAefu9SLAJbefZA2uhqwEXuUjCSRfXAjfKotgEMZ9g89Znw22j2xDxvQA1HbqCMS0Y6tVcp0r5p869gw7Uud2rmxFjW-7x9uFQ9jDfiFRshQHeO22kxb2itNFSzzQmtBpSi");

          const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
          };

          fetch(`https://psychic-space-carnival-x55p5rqv6wvxc6gr7-3001.app.github.dev/api/users/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => setStore({ usuario: result }))
            .catch((error) => console.error(error));
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
        console.log(name);
        const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxOVUvWi4TCs7XIbJP1uHqhIvTU-rYsOeG0-Xl_GIOZm1W5nEqoiIYeEsHpC_BD2IpM-7kM_BT17nf0sb_690YiP9sOfsKECJFqprFL8oYl4uyDNEWLpwdXzEFj44Tgkb-vRccwfsSvh1WOe4N1USGKharXXv3OHM7W6RkdfyM2de203LBGgRI7npFHw1md5vzJwXaZzOgPXeuFJ6g5uPcde09Stl_tKSgG1TYj1egMCpGsMK8bgNNjAd3VtmAZqBniKwY9iSTw2REiF-d-l61DyKPziZiH6sWrQ9m-FTRjqJTrj_0U8uFJV4UPJo8Ft1I1AafTmbvRA8cjX3Ro-2ig1AM-hhPSYwvhyok7ldbiHKy6zdmnovjEG7HJWIhq4o8tllQIqSFOVz64lHwv9FKnPhGMD7OONSiHWrtu_L4fHqi_-YQWfVWCFYahz2Gac0oCFa4O21d4U9P7J-ytG5w1wdpqqe3Tb9ZmXSLpWJd3jPgkJKRBwdxz9qadwRPSWX43oAsfwY3uIHIvEFoVxlwFP1a_5OhcyZIrHhZWIbVI9jp6zv-Zjdy2HWNVa4nlzRSbx9kptL20iyYgqiZp5llu9cdXyWxcROUYTELvtN8Yid2v88C3WzwrGOyPgV9-GV9mevA9BIq_xyVKqGbbA75rwP0wGX0LGQAPimp8GWBXBJu3il9G5tYGRkPdfioJ07Puono234GwaKINnFhCWJL-dOmtrsaCaTuYcgGa-D-3bsqpFDLrwAL8VSoKj3jHm8MftzJgj1EKxj_bqOXzF_UQWklL-O8ekYnNP18MDB7Ti4ScQue7hVnqr0B11yE8-Z77mDmwHHNi4_YN_aPXnvKJyQkehcKIQ4aEsaIiO-C-r3WixdYQcX2-ENps6GWhaIzvHKFKCpilbDzkuM03BqJ-j9uNfWwHYfaNJJUr34aJpW8ZnBS2KWl4jeJKSJ5Z6pQxkoSiQgi1Jw3-Q0YKIgXB1");

          const raw = JSON.stringify({
            "name": name,
           /*  "user_id": id */
          });

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };

          fetch(`https://psychic-space-carnival-x55p5rqv6wvxc6gr7-3001.app.github.dev/api/lists/${store.userId}`, requestOptions)
            .then((response) => response.json())
            .then((result) => setStore({ lista: result }))
            .catch((error) => console.error(error));
        },
      
      getEditarLista: async (name, id) => {
        const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxOxFN2xCLzezeysRm58pcuqpRyd-s4cgh7oMXb2F-OfCL1Z8rFeBzvEKMOBT2ARYH2gFBMV0-IanG5fjU8yhd6pRg_oWOr9FOhfSuGPkkZAY0tEQrra-wJ7ZLfRItKpQaPkxxWENcuhTeQXPNX3xNNEVmE7FqlwpPwj0hYkzJcv9rpY1CnsO1O0bkkVRhSQtnL0gkrRF_cTSjDfSrr_gN1dlJqf70-7paD4MktWANf-U3DTl2i5C75urqmEhr0Pj9L3VPu9bJ6JE7QGLADHRz8lpbkVT8OjZBWZrjzXf6jjOAcuVNujdN1-z04ajWvN5SdfK6lz4Swx8bNhaZRsNn0AmsEhhNpU01Wml4bEkGAuOvLTDTIFc8eDGCaT0ufIwAJIRxa6mfyCm25XNCty8VuTNpme_ekDty-E7kGbN_WTSoDgtrakqMJwH-2rYRxB_3x1EOEwujUGbi8FeOTblYORGQBFyt7w6oJ3YKksjNRQgCz0FqUwtJqITfvjvK5c1Z5Un3T1wVsXW0FmVkWLyHTtg-Yc8eX8DzM-Lt5Kw-a8WIBXQbH0dbSYXrBek9-dCRkaWjaXOMjX1cU__J0OHwoWoiGge5CRxr0yuDWFx0iJCbM63hMEsU10agplivie8Rhp5eOyDaWjSmUJqbcPRto9PMGsmQF6SYe29MRLx4XZkvVHT-DdquzYY94nXne0M-uRDIglfq0CH0JNinv3Nv4i8OXt7T2v5u_tzYqnILtrmeDrjCV1YrxWmsyqfg7HJbXSrzaNZekdzqccaMckK5GSa5vSMcx53Tyl6STJYlmKOLLKNV0TmMm8ln0T_TGPAfwtN9Stds537q8fzCec1rbFPE3jYhxynhsBYFqZjeSLNBVKQ-7-0mbIiMKzLPz114jdS2T0uCNN2Oqj3BzWl0YRIrMxxhR0HhqgdBYW6RMBxMJ-o6RSf6sZLEAzzlWFy0lKD3lCFICG5vyCHqFxpXyB");

            const raw = JSON.stringify({
              "name": name
            });

            const requestOptions = {
              method: "PUT",
              headers: myHeaders,
              body: raw,
              redirect: "follow"
            };

            fetch(`https://psychic-space-carnival-x55p5rqv6wvxc6gr7-3001.app.github.dev/api/lists/${store.lista}`, requestOptions)
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
