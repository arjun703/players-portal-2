export  async function pOSTRequest(formData, endPoint){
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(endPoint, {
          method: 'POST',
          headers: {
            'Authorization': `${token}`
            },
          body: formData,
        });

        const responseJson = response.json()

        if (response.ok) {
            return responseJson
        } else {
            return {success: false, msg: 'Response not OK'};
        }

    } catch (error) {
        return {success: false, msg: response.msg};
    }
   
}

export  async function uPDATErequest(formData, endPoint){
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(endPoint, {
          method: 'PUT',
          headers: {
            'Authorization': `${token}`
            },
          body: formData,
        });

        const responseJson = response.json()

        if (response.ok) {
            return responseJson
        } else {
            return {success: false, msg: 'Response not OK'};
        }

    } catch (error) {
        return {success: false, msg: response.msg};
    }

}

export  async function dELETErequest(formData, endPoint){
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(endPoint, {
          method: 'DELETE',
          headers: {
            'Authorization': `${token}`
            },
          body: formData,
        });

        const responseJson = response.json()

        if (response.ok) {
            return responseJson
        } else {
            return {success: false, msg: 'Response not OK'};
        }

    } catch (error) {
        return {success: false, msg: response.msg};
    }
}

export  async function getRequest(endPoint){
    const token = 'abc';
    console.log(endPoint, 'endpoint')
    try {
        const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        });

        const responseJson = response.json()

        if (response.ok) {
            return responseJson
        } else {
            throw new Error('Error retrieving info')
        }

    } catch (error) {
        throw new Error('Error retrieving info - ' +error)
    }
}