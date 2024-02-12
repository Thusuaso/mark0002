import axios from 'axios';

const api = axios.create({
    baseURL: "https://file-service.mekmar.com",
    //baseURL: "http://localhost:5002",
      headers: {
          "Content-Type":"multipart/form-data",
      },
});

const fileService = {
    sendInvoice(file, id, siparisno) {
        const kontrol = file.name.split(".").length;
        if (kontrol > 2) {
          alert(
            "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
          );
          return;
        }
        const dosya = siparisno;
    
        const url = "file/upload/" + id + "/" + dosya;
        const formData = new FormData();
        formData.append("file", file);
    
        return api.post(url, formData).then((res) => {
          return { ...res.data, dosyaAdi: dosya };
        });
      },
     sendTransport(file,id,invoiceName){
      const kontrol = file.name.split(".").length;
      if (kontrol > 2) {
        alert(
          "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
        );
        return;
      }
      //  let uzanti = file.name.split('.')[1];
      // let dosya = 'numune.' + uzanti;
      const dosya = invoiceName + '.pdf';
  
      const url = "file/customer/upload/" + id + "/" + dosya;
  
      const formData = new FormData();
      formData.append("file", file);
  
      return api.post(url, formData).then((res) => {
        return { ...res.data, dosyaAdi: dosya };
      });
    },
    sendInvoiceShipping(file, id, invoiceName) {

      const kontrol = file.name.split(".").length;
      if (kontrol > 2) {
        alert(
          "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
        );
        return;
      }
      //  let uzanti = file.name.split('.')[1];
      // let dosya = 'numune.' + uzanti;
      const dosya = invoiceName;
  
      const url = "file/customer/upload/" + id + "/" + dosya;
  
      const formData = new FormData();
      formData.append("file", file);
  
      return api.post(url, formData).then((res) => {
        return { ...res.data, dosyaAdi: dosya };
      });
  },
     sendSample(file, numuneId) {
    const kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    const dosya = file.name;

    const url = "file/upload/numune/numuneDosya/" + numuneId + "/" + dosya;
    const formData = new FormData();
    formData.append("file", file);

    return api.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },
  sendProforma(file, teklifId, siparisno) {

    const kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    const dosya = siparisno;

    const url = "file/upload/" + teklifId + "/" + dosya;
    const formData = new FormData();
    formData.append("file", file);

    return api.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },
  sendIsf(file,id,po) {
    const kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    const dosya = po;

    const url = "file/upload/" + id + "/" + dosya;
    const formData = new FormData();
    formData.append("file", file);

    return api.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  }
}

export default fileService;

