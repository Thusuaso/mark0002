const state = {
  financeExpiryListTotal: 0,
  financeDetailInsuranceList: [],
  financeList: [],
  financeListAll: [],
  financeListTotal: {
    total: 0,
    production: 0,
    forwarding: 0,
    advanced: 0,
    paid: 0,
    balance: 0,
    balanceProduction: 0,
  },
  financeExpiryList: [],
  financeCollectionList: [],
  financeCollectionYearList: [],
  financeCollectionMonthList: [],
  financeCollectionTotal: 0,
  financeAdvancedPaymentList: [],
  financePoList: [],
  financePaidList: [],
  financePoListTotal: {
    order: 0,
    advancedPayment: 0,
    paid: 0,
    balanced: 0,
  },
  financeTotalListMekmer: {
    order: 0,
    shipped: 0,
    produced: 0,
    paid: 0,
    balanced: 0,
    balancedExceptProduction: 0,
  },
  financePaidListTotal: 0,
  financePoButtonStatus: true,
  financePoPaidList: [],
  financePoPaidDetailList: [],
  financeListMaya: [],
  financeCollectionSampleList: [],
  financeCollectionSampleTotal: 0,
  financePoPaidListMekmer: [],
  financeListFilter: [],
};
const actions = {
  setFinanceAllListMekmer(vuexContext) {
    return new Promise((resolve, reject) => {
      this.$excelApi.get("/finance/reports/mekmer/all").then((response) => {
        if (response) {
          vuexContext.commit("setFinanceListFilter", response.data.financeList);
          vuexContext.commit("setFinanceTotalList", response.data.financeList);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },
  setFinanceList(vuexContext) {
    vuexContext.dispatch("setBeginLoadingAction");

    this.$excelApi.get("/finance/reports/test").then((response) => {
      if (response.data) {
        vuexContext.commit("setFinanceList", response.data);
        vuexContext.commit("setFinanceTotalList", response.data.financeList);
        vuexContext.dispatch("setEndLoadingAction");
      }
    });

    // this.$axios.get('/finance/list')
    //     .then(response => {
    //         if (response.data) {
    //             vuexContext.commit('setFinanceList', response.data);

    //         }
    //     });
  },

  setFinanceListFilter(vuexContext) {
    vuexContext.dispatch("setBeginLoadingAction");

    this.$excelApi.get("/finance/reports/test/filter").then((response) => {
      if (response.data) {
        vuexContext.commit("setFinanceListFilter", response.data.financeList);
        vuexContext.commit(
          "setFinanceTotalListMekmer",
          response.data.financeList
        );
        vuexContext.dispatch("setEndLoadingAction");
      }
    });
  },

  setFinanceTotalList(vuexContext, finance) {
    vuexContext.commit("setFinanceTotalList", finance);
  },
  setFinanceTotalListMekmer(vuexContext, finance) {
    vuexContext.commit("setFinanceTotalListMekmer", finance);
  },
  setFinanceCollectionList(vuexContext) {
    vuexContext.dispatch("setBeginLoadingAction");
    this.$axios.get("/finance/collection/list").then((response) => {
      vuexContext.commit("setFinanceCollectionList", response.data);
      vuexContext.dispatch("setFinanceCollectionTotal", response.data.list);
      vuexContext.commit(
        "setFinanceCollectionSampleTotal",
        response.data.sample
      );

      vuexContext.dispatch("setEndLoadingAction");
    });
  },
  setFinanceCollectionListMekmer(vuexContext) {
    vuexContext.dispatch("setBeginLoadingAction");
    this.$axios.get("/finance/collection/list/mekmer").then((response) => {
      vuexContext.commit("setFinanceCollectionList", response.data);
      vuexContext.dispatch("setFinanceCollectionTotal", response.data.list);
      vuexContext.commit(
        "setFinanceCollectionSampleTotal",
        response.data.sample
      );

      vuexContext.dispatch("setEndLoadingAction");
    });
  },
  setFinanceCollectionListMekmerYear(vuexContext, year) {
    vuexContext.dispatch("setBeginLoadingAction");
    this.$axios
      .get(`/finance/collection/list/mekmer/year/${year}`)
      .then((response) => {
        vuexContext.commit("setFinanceCollectionListMekmerYear", response.data);
        vuexContext.dispatch("setFinanceCollectionTotal", response.data.list);
        vuexContext.commit(
          "setFinanceCollectionSampleTotal",
          response.data.sample
        );

        vuexContext.dispatch("setEndLoadingAction");
      });
  },

  setFinanceCollectionListMekmerMonth(vuexContext, data) {
    vuexContext.dispatch("setBeginLoadingAction");
    this.$axios
      .get(`/finance/collection/list/mekmer/month/${data.year}/${data.month}`)
      .then((response) => {
        vuexContext.commit(
          "setFinanceCollectionListMekmerMonth",
          response.data
        );
        vuexContext.dispatch("setFinanceCollectionTotal", response.data.list);
        vuexContext.commit(
          "setFinanceCollectionSampleTotal",
          response.data.sample
        );

        vuexContext.dispatch("setEndLoadingAction");
      });
  },

  setFinanceCollectionTotal(vuexContext, payload) {
    vuexContext.commit("setFinanceCollectionTotal", payload);
  },
  setFinanceCollectionListYear(vuexContext, year) {
    vuexContext.dispatch("setBeginLoadingAction");
    this.$axios
      .get(`/finance/collection/list/year/${year}`)
      .then((response) => {
        vuexContext.commit("setFinanceCollectionListYear", response.data);
        vuexContext.dispatch("setFinanceCollectionTotal", response.data.list);
        vuexContext.commit(
          "setFinanceCollectionSampleTotal",
          response.data.sample
        );

        vuexContext.dispatch("setEndLoadingAction");
      });
  },
  setFinanceCollectionListMonth(vuexContext, finance) {
    vuexContext.dispatch("setBeginLoadingAction");
    this.$axios
      .get(`/finance/collection/list/month/${finance.month}/${finance.year}`)
      .then((response) => {
        vuexContext.commit("setFinanceCollectionListMonth", response.data.list);
        vuexContext.dispatch("setFinanceCollectionTotal", response.data.list);
        vuexContext.dispatch("setEndLoadingAction");
      });
  },
  setFinanceAdvancedPaymentList(vuexContext) {
    this.$axios.get("/finance/advanced/payment/list").then((response) => {
      vuexContext.commit("setFinanceAdvancedPaymentList", response.data.list);
    });
  },
  setFinanceAdvancedPaymentListMekmer(vuexContext) {
    this.$axios
      .get("/finance/advanced/payment/list/mekmer")
      .then((response) => {
        vuexContext.commit("setFinanceAdvancedPaymentList", response.data.list);
      });
  },
  setAdvancedPaymentSave(vuexContext, advancedPayment) {
    this.$axios
      .post("/finance/advanced/payment/save", advancedPayment)
      .then((response) => {
        if (response.data.status) {
          this.$toast.success("Peşinat Başarıyla Kaydedildi.");
          vuexContext.dispatch("setAdvancedPaymentSendMail", {
            ...advancedPayment,
            Mail: "bilgiislem@mekmar.com",
          });
          vuexContext.dispatch("setAdvancedPaymentSendMail", {
            ...advancedPayment,
            Mail: "huseyin@mekmer.com",
          });
          vuexContext.dispatch("setAdvancedPaymentSendMail", {
            ...advancedPayment,
            Mail: "info@mekmar.com",
          });
          vuexContext.dispatch("setAdvancedPaymentSendMail", {
            ...advancedPayment,
            Mail: "mehmet@mekmer.com",
          });
          vuexContext.dispatch("setFinancePoPaidList", paid.SiparisNo);
          vuexContext.dispatch("setFinanceList");
          vuexContext.dispatch("setFinancePoList", paid.MusteriID);

          vuexContext.dispatch("setFinanceAdvancedPaymentList");
        } else {
          this.$toast.error("Peşinat Kaydetme Başarısız.");
        }
      });
  },
  setAdvancedPaymentSaveMekmer(vuexContext, advancedPayment) {
    this.$axios
      .post("/finance/advanced/payment/save/mekmer", advancedPayment)
      .then((response) => {
        if (response.data.status) {
          this.$toast.success("Peşinat Başarıyla Kaydedildi.");
          vuexContext.dispatch("setAdvancedPaymentSendMail", {
            ...advancedPayment,
            Mail: "bilgiislem@mekmar.com",
          });
          vuexContext.dispatch("setAdvancedPaymentSendMail", {
            ...advancedPayment,
            Mail: "huseyin@mekmer.com",
          });

          vuexContext.dispatch("setFinancePoPaidList", paid.SiparisNo);
          vuexContext.dispatch("setFinanceList");
          vuexContext.dispatch("setFinancePoList", paid.MusteriID);

          vuexContext.dispatch("setFinanceAdvancedPaymentListMekmer");
        } else {
          this.$toast.error("Peşinat Kaydetme Başarısız.");
        }
      });
  },
  setAdvancedPaymentSendMail(vuexContext, advancedPayment) {
    this.$axios
      .post("/mail/advanced/payment/server", advancedPayment)
      .then((response) => {
        if (response.data.status) {
          this.$toast.success("Mail Başarıyla Gönderildi.");
        } else {
          this.$toast.error("Mail Gönderme Başarısız.");
        }
      });
  },
  setFinancePoList(vuexContext, customerId) {
    vuexContext.dispatch("setBeginLoadingAction");

    this.$axios.get(`/finance/po/list/${customerId}`).then((response) => {
      vuexContext.commit("setFinancePoList", response.data);
      vuexContext.dispatch("setFinancePoListTotal", response.data.poList);
      vuexContext.dispatch("setFinancePaidListTotal", response.data.paidList);
      vuexContext.dispatch("setEndLoadingAction");
    });
  },
  setFinancePoListMekmer(vuexContext, customerId) {
    vuexContext.dispatch("setBeginLoadingAction");

    this.$axios.get(`/finance/po/list/${customerId}`).then((response) => {
      vuexContext.commit("setFinancePoListMekmer", response.data);
      vuexContext.dispatch("setFinancePoListTotal", response.data.poList);
      vuexContext.dispatch("setFinancePaidListTotal", response.data.paidList);
      vuexContext.dispatch("setEndLoadingAction");
    });
  },
  setFinancePoMekmerList(vuexContext, customerId) {
    vuexContext.dispatch("setBeginLoadingAction");

    this.$excelApi
      .get("/finance/po/list/mekmer/" + customerId)

      .then((res) => {
        vuexContext.commit("setFinancePoListMekmer", res.data);
        vuexContext.commit("setFinancePoPaidList", res.data.odeme_liste);
        vuexContext.dispatch(
          "setFinancePoListTotalMekmer",
          res.data.ayrinti_list
        );
        vuexContext.dispatch(
          "setFinancePaidListTotalMekmer",
          res.data.odeme_liste
        );
        vuexContext.dispatch("setEndLoadingAction");
      });
  },

  setFinancePoListTotal(vuexContext, payload) {
    vuexContext.commit("setFinancePoListTotal", payload);
  },
  setFinancePoListTotalMekmer(vuexContext, payload) {
    vuexContext.commit("setFinancePoListTotalMekmer", payload);
  },
  setFinancePaidListTotal(vuexContext, payload) {
    vuexContext.commit("setFinancePaidListTotal", payload);
  },
  setFinancePaidListTotalMekmer(vuexContext, payload) {
    vuexContext.commit("setFinancePaidListTotalMekmer", payload);
  },
  setFinancePoButtonStatus(vuexContext, payload) {
    vuexContext.commit("setFinancePoButtonStatus", payload);
  },
  setPoPaidSave(vuexContext, paid) {
    this.$axios.post("/finance/po/paid/save", paid).then((response) => {
      if (response.data.status) {
        this.$toast.success("Ödeme Kaydedildi.");
        vuexContext.dispatch("setPoPaidSaveSendMail", {
          ...paid,
          Mail: "bilgiislem@mekmar.com",
        });
        vuexContext.dispatch("setPoPaidSaveSendMail", {
          ...paid,
          Mail: "huseyin@mekmer.com",
        });
        vuexContext.dispatch("setPoPaidSaveSendMail", {
          ...paid,
          Mail: "info@mekmar.com",
        });
        vuexContext.dispatch("setPoPaidSaveSendMail", {
          ...paid,
          Mail: "mehmet@mekmer.com",
        });
        vuexContext.dispatch("setPoPaidSaveSendMail", {
          ...paid,
          Mail: "export1@mekmar.com",
        });
        vuexContext.dispatch("setPoPaidSaveSendMail", {
          ...paid,
          Mail: "export2@mekmar.com",
        });
        vuexContext.dispatch("setFinancePoList", paid.MusteriID);
        vuexContext.dispatch("setFinanceList");
        vuexContext.dispatch("setFinancePoModel");
      } else {
        this.$toast.error("Ödeme Kaydedilemedi.");
      }
    });
  },

  setPoPaidMekmerSave(vuexContext, paid) {
    this.$excelApi
      .post("/finance/po/paid/mekmer/save", paid)
      .then((response) => {
        if (response.status) {
          this.$toast.success("Ödeme Kaydedildi.");
          vuexContext.dispatch("setPoPaidSaveSendMailMekmer", {
            ...paid,
            Mail: "bilgiislem@mekmar.com",
          });
          vuexContext.dispatch("setPoPaidSaveSendMailMekmer", {
            ...paid,
            Mail: "huseyin@mekmer.com",
          });
          vuexContext.dispatch("setPoPaidSaveSendMailMekmer", {
            ...paid,
            Mail: "sergen@mekmer.com",
          });

          vuexContext.dispatch("setFinancePoMekmerList", paid.musteri_id);
          vuexContext.dispatch("setFinancePoPaidListMekmer", paid.siparisno);
          vuexContext.dispatch("setFinanceListFilter");
          vuexContext.dispatch("setFinancePoModelMekmer");
        } else {
          this.$toast.success("Ödeme Kaydedilemedi.");
        }
      });
  },

  setPoPaidSaveSendMail(vuexContext, paid) {
    this.$axios.post("/finance/po/paid/send/mail", paid).then((response) => {
      if (response.data.status) {
        this.$toast.success("Mail Başarıyla Gönderildi.");
      } else {
        this.$toast.error("Mail Gönderme Başarısız.");
      }
    });
  },
  setPoPaidSaveSendMailMekmer(vuexContext, paid) {
    this.$axios
      .post("/finance/po/paid/send/mail/mekmer", paid)
      .then((response) => {
        if (response.data.status) {
          this.$toast.success("Mail Başarıyla Gönderildi.");
        } else {
          this.$toast.error("Mail Gönderme Başarısız.");
        }
      });
  },

  setFinancePoPaidList(vuexContext, po) {
    this.$axios.get(`/finance/po/paid/list/${po}`).then((response) => {
      vuexContext.commit("setFinancePoPaidList", response.data.list);
    });
  },
  setFinancePoPaidListMekmer(vuexContext, po) {
    this.$excelApi
      .get(`/finance/po/paid/list/mekmer/${po}`)
      .then((response) => {
        vuexContext.commit("setFinancePoPaidListMekmer", response.data.liste);
      });
  },

  setPoPaidDelete(vuexContext, paid) {
    this.$axios
      .delete(`/finance/po/paid/delete/${paid.ID}`)
      .then((response) => {
        if (response.data.status) {
          this.$toast.success("Tahsilat Başarıyla Silindi");
          vuexContext.dispatch("setPoPaidDeleteSendMail", {
            ...paid,
            Mail: "bilgiislem@mekmar.com",
          });
          vuexContext.dispatch("setPoPaidDeleteSendMail", {
            ...paid,
            Mail: "huseyin@mekmer.com",
          });
          vuexContext.dispatch("setPoPaidDeleteSendMail", {
            ...paid,
            Mail: "info@mekmar.com",
          });
          vuexContext.dispatch("setPoPaidDeleteSendMail", {
            ...paid,
            Mail: "mehmet@mekmer.com",
          });
          vuexContext.dispatch("setPoPaidDeleteSendMail", {
            ...paid,
            Mail: "export1@mekmar.com",
          });
          vuexContext.dispatch("setPoPaidDeleteSendMail", {
            ...paid,
            Mail: "export2@mekmar.com",
          });

          vuexContext.dispatch("setFinancePoPaidList", paid.SiparisNo);
          vuexContext.dispatch("setFinancePoList", paid.MusteriID);
          vuexContext.dispatch("setFinanceList");
          vuexContext.dispatch("setFinancePoModel");
        } else {
          this.$toast.error("Tahsilat Silme Başarısız.");
        }
      });
  },

  setPoPaidDeleteMekmer(vuexContext, paid) {
    this.$axios
      .delete(`/finance/po/paid/delete/mekmer/${paid.id}`)
      .then((response) => {
        if (response.data.status) {
          this.$toast.success("Tahsilat Başarıyla Silindi");
          vuexContext.dispatch("setPoPaidDeleteSendMailMekmer", {
            ...paid,
            Mail: "bilgiislem@mekmar.com",
          });
          vuexContext.dispatch("setPoPaidDeleteSendMailMekmer", {
            ...paid,
            Mail: "huseyin@mekmer.com",
          });
          vuexContext.dispatch("setPoPaidDeleteSendMailMekmer", {
            ...paid,
            Mail: "info@mekmar.com",
          });

          vuexContext.dispatch("setFinancePoMekmerList", paid.musteri_id);
          vuexContext.dispatch("setFinancePoPaidListMekmer", paid.siparisno);
          vuexContext.dispatch("setFinanceListFilter");
          vuexContext.dispatch("setFinancePoModelMekmer");
        } else {
          this.$toast.error("Tahsilat Silme Başarısız.");
        }
      });
  },

  setPoPaidDeleteSendMail(vuexContext, paid) {
    this.$axios
      .post("/finance/po/paid/delete/send/mail", paid)
      .then((response) => {
        if (response.data.status) {
          this.$toast.success("Mail Başarıyla Gönderildi.");
        } else {
          this.$toast.error("Mail Gönderme Başarısız.");
        }
      });
  },

  setPoPaidDeleteSendMailMekmer(vuexContext, paid) {
    this.$axios
      .post("/finance/po/paid/delete/send/mail/mekmer", paid)
      .then((response) => {
        if (response.data.status) {
          this.$toast.success("Mail Başarıyla Gönderildi.");
        } else {
          this.$toast.error("Mail Gönderme Başarısız.");
        }
      });
  },

  setPoPaidUpdate(vuexContext, paid) {
    this.$axios.put("/finance/po/paid/update", paid).then((response) => {
      if (response.data.status) {
        this.$toast.success("Tahsilat Başarıyla Güncellendi");
        vuexContext.dispatch("setPoPaidUpdateSendMail", {
          ...paid,
          Mail: "bilgiislem@mekmar.com",
        });
        vuexContext.dispatch("setPoPaidUpdateSendMail", {
          ...paid,
          Mail: "huseyin@mekmer.com",
        });
        vuexContext.dispatch("setPoPaidUpdateSendMail", {
          ...paid,
          Mail: "info@mekmar.com",
        });
        vuexContext.dispatch("setPoPaidUpdateSendMail", {
          ...paid,
          Mail: "mehmet@mekmer.com",
        });
        vuexContext.dispatch("setPoPaidUpdateSendMail", {
          ...paid,
          Mail: "export1@mekmar.com",
        });
        vuexContext.dispatch("setPoPaidUpdateSendMail", {
          ...paid,
          Mail: "export2@mekmar.com",
        });
        vuexContext.dispatch("setFinancePoPaidList", paid.SiparisNo);
        vuexContext.dispatch("setFinancePoList", paid.MusteriID);
        vuexContext.dispatch("setFinanceList");
        vuexContext.dispatch("setFinancePoModel");
      } else {
        this.$toast.error("Tahsilat Güncelleme Başarısız.");
      }
    });
  },
  setPoPaidUpdateMekmer(vuexContext, paid) {
    this.$axios.put("/finance/po/paid/update/mekmer", paid).then((response) => {
      if (response.data.status) {
        this.$toast.success("Tahsilat Başarıyla Güncellendi");
        vuexContext.dispatch("setPoPaidUpdateSendMailMekmer", {
          ...paid,
          Mail: "bilgiislem@mekmar.com",
        });
        vuexContext.dispatch("setPoPaidUpdateSendMailMekmer", {
          ...paid,
          Mail: "huseyin@mekmer.com",
        });
        vuexContext.dispatch("setPoPaidUpdateSendMailMekmer", {
          ...paid,
          Mail: "sergen@mekmer.com",
        });

        vuexContext.dispatch("setFinancePoMekmerList", paid.musteri_id);
        vuexContext.dispatch("setFinancePoPaidListMekmer", paid.siparisno);

        vuexContext.dispatch("setFinanceListFilter");
        vuexContext.dispatch("setFinancePoModelMekmer");
      } else {
        this.$toast.error("Tahsilat Güncelleme Başarısız.");
      }
    });
  },
  setPoPaidUpdateSendMail(vuexContext, paid) {
    this.$axios
      .post("/finance/po/paid/update/send/mail", paid)
      .then((response) => {
        if (response.data.status) {
          this.$toast.success("Mail Başarıyla Gönderildi.");
        } else {
          this.$toast.error("Mail Gönderme Başarısız.");
        }
      });
  },
  setPoPaidUpdateSendMailMekmer(vuexContext, paid) {
    this.$axios
      .post("/finance/po/paid/update/send/mail/mekmer", paid)
      .then((response) => {
        if (response.data.status) {
          this.$toast.success("Mail Başarıyla Gönderildi.");
        } else {
          this.$toast.error("Mail Gönderme Başarısız.");
        }
      });
  },
  setPoPaidDetailList(vuexContext, value) {
    this.$axios
      .get(`/finance/po/paid/detail/list/${value.Tarih}/${value.MusteriID}`)
      .then((response) => {
        vuexContext.commit("setPoPaidDetailList", response.data.list);
      });
  },
  setFinanceCost(vuexContext, payload) {
    this.$axios.post("/finance/cost/control", payload).then((res) => {});
  },
};
const mutations = {
  setFinanceTotalListMekmer(state, payload) {
    state.financeTotalListMekmer = {
      order: 0,
      shipped: 0,
      produced: 0,
      paid: 0,
      balanced: 0,
      balancedExceptProduction: 0,
    };
    payload.forEach((x) => {
      state.financeTotalListMekmer.order += x.total_order_amount;
      state.financeTotalListMekmer.shipped += x.forwarding;
      state.financeTotalListMekmer.produced += x.production;
      state.financeTotalListMekmer.paid += x.paid;
      state.financeTotalListMekmer.balanced += x.total;
      state.financeTotalListMekmer.balancedExceptProduction +=
        x.totalExceptProduction;
    });
  },
  setFinanceAllListMekmer(state, payload) {
    state.financeListFilter = payload;
  },
  setFinanceListFilter(state, payload) {
    state.financeListFilter = payload;
  },
  setFinancePoPaidListMekmer(state, payload) {
    state.financePoPaidListMekmer = payload;
  },
  setFinanceCollectionSampleTotal(state, payload) {
    state.financeCollectionSampleTotal = 0;
    payload.forEach((x) => {
      state.financeCollectionSampleTotal += x.Tutar;
    });
  },
  setFinanceTotalList(state, payload) {
    state.financeListTotal = {
      total: 0,
      production: 0,
      forwarding: 0,
      advanced: 0,
      paid: 0,
      balance: 0,
      balanceProduction: 0,
    };
    payload.forEach((x) => {
      state.financeListTotal.total += x.total_order_amount;
      state.financeListTotal.production += x.production;
      state.financeListTotal.forwarding += x.forwarding;
      state.financeListTotal.advanced += x.advanced_payment;
      state.financeListTotal.paid += x.paid;
      state.financeListTotal.balanceProduction +=
        x.production + x.forwarding - x.paid;
      state.financeListTotal.balance += x.forwarding - x.paid;
    });
  },

  setFinanceList(state, payload) {
    state.financeList = [];
    state.financeListAll = [];
    state.financeListTotal = {
      total: 0,
      production: 0,
      forwarding: 0,
      advanced: 0,
      paid: 0,
      balance: 0,
      balanceProduction: 0,
    };
    for (const item of payload.financeList) {
      if (item.forwarding - item.paid == 0) {
        continue;
      } else if (
        item.forwarding - item.paid > 8 ||
        item.forwarding - item.paid < -8
      ) {
        item.balanced = item.forwarding - item.paid;
        state.financeList.push(item);
      }
    }
    for (const item of payload.financeList) {
      item.balanced = item.forwarding - item.paid;
      state.financeListAll.push(item);
    }
    state.financeExpiryList = payload.vadeList;
    state.financeExpiryListTotal = 0;
    payload.vadeList.forEach((x) => {
      state.financeExpiryListTotal += x.tutar;
    });
    state.financeListMaya = payload.mayaList;
  },
  setFinanceCollectionList(state, payload) {
    state.financeCollectionList = payload.list;
    state.financeCollectionYearList = payload.years;
    state.financeCollectionMonthList = payload.months;
    state.financeCollectionSampleList = payload.sample;
  },
  setFinanceCollectionListMekmerYear(state, payload) {
    state.financeCollectionList = payload.list;
    state.financeCollectionMonthList = payload.months;
    state.financeCollectionSampleList = payload.sample;
  },
  setFinanceCollectionListMekmerMonth(state, payload) {
    state.financeCollectionList = payload.list;
    state.financeCollectionSampleList = payload.sample;
  },
  setFinanceCollectionTotal(state, payload) {
    state.financeCollectionTotal = 0;
    payload.forEach((x) => {
      state.financeCollectionTotal += x.Tutar;
    });
  },
  setFinanceCollectionListYear(state, payload) {
    state.financeCollectionList = payload.list;
    state.financeCollectionMonthList = payload.months;
    state.financeCollectionSampleList = payload.sample;
  },
  setFinanceCollectionListMonth(state, payload) {
    state.financeCollectionList = payload;
  },
  setFinanceAdvancedPaymentList(state, payload) {
    state.financeAdvancedPaymentList = payload;
  },
  setFinancePoList(state, payload) {
    state.financePoList = payload.poList;
    state.financePaidList = payload.paidList;
    state.financeDetailInsuranceList = payload.insuranceList;
  },

  setFinancePoListMekmer(state, payload) {
    state.financePoList = payload.ayrinti_list;
    state.financePaidList = payload.odeme_liste;
  },
  setFinancePoListTotal(state, payload) {
    state.financePoListTotal = {
      order: 0,
      advancedPayment: 0,
      paid: 0,
      balanced: 0,
    };

    payload.forEach((x) => {
      state.financePoListTotal.order += x.OrderTotal;
      state.financePoListTotal.advancedPayment += x.Pesinat;
      state.financePoListTotal.paid += x.Paid;
      state.financePoListTotal.balanced += x.Balanced;
    });
  },
  setFinancePoListTotalMekmer(state, payload) {
    state.financePoListTotal = {
      order: 0,
      advancedPayment: 0,
      paid: 0,
      balanced: 0,
    };

    payload.forEach((x) => {
      state.financePoListTotal.order += x.siparis_total;
      state.financePoListTotal.advancedPayment += x.pesinat;
      state.financePoListTotal.paid += x.odenen_tutar;
      state.financePoListTotal.balanced += x.kalan;
    });
  },
  setFinancePaidListTotal(state, payload) {
    state.financePaidListTotal = 0;
    payload.forEach((x) => {
      state.financePaidListTotal += x.Paid;
    });
  },
  setFinancePaidListTotalMekmer(state, payload) {
    state.financePaidListTotal = 0;
    payload.forEach((x) => {
      state.financePaidListTotal += x.tutar;
    });
  },
  setFinancePoButtonStatus(state, payload) {
    state.financePoButtonStatus = payload;
  },
  setFinancePoPaidList(state, payload) {
    state.financePoPaidList = payload;
  },
  setPoPaidDetailList(state, payload) {
    state.financePoPaidDetailList = payload;
  },
};
const getters = {
  getFinanceExpiryListTotal(state) {
    return state.financeExpiryListTotal;
  },
  getFinanceDetailInsuranceList(state) {
    return state.financeDetailInsuranceList;
  },
  getFinanceTotalListMekmer(state) {
    return state.financeTotalListMekmer;
  },
  getFinanceListFilter(state) {
    return state.financeListFilter;
  },
  getfinanceList(state) {
    return state.financeList;
  },
  getFinanceListAll(state) {
    return state.financeListAll;
  },
  getFinanceListTotal(state) {
    return state.financeListTotal;
  },
  getFinanceExpiryList(state) {
    return state.financeExpiryList;
  },
  getFinanceCollectionList(state) {
    return state.financeCollectionList;
  },
  getFinanceCollectionYearList(state) {
    return state.financeCollectionYearList;
  },
  getFinanceCollectionMonthList(state) {
    return state.financeCollectionMonthList;
  },
  getFinanceCollectionTotal(state) {
    return state.financeCollectionTotal;
  },
  getFinanceAdvancedPaymentList(state) {
    return state.financeAdvancedPaymentList;
  },
  getFinancePoList(state) {
    return state.financePoList;
  },
  getFinancePaidList(state) {
    return state.financePaidList;
  },
  getFinancePoListTotal(state) {
    return state.financePoListTotal;
  },
  getFinancePaidListTotal(state) {
    return state.financePaidListTotal;
  },
  getFinancePoButtonStatus(state) {
    return state.financePoButtonStatus;
  },
  getFinancePoPaidList(state) {
    return state.financePoPaidList;
  },
  getFinancePoPaidDetailList(state) {
    return state.financePoPaidDetailList;
  },
  getFinanceListMaya(state) {
    return state.financeListMaya;
  },
  getFinanceCollectionSampleList(state) {
    return state.financeCollectionSampleList;
  },
  getFinanceCollectionSampleTotal(state) {
    return state.financeCollectionSampleTotal;
  },
  getFinancePoPaidListMekmer(state) {
    return state.financePoPaidListMekmer;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
