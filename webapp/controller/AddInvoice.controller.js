sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
  ], function (Controller, History, MessageToast) {
    "use strict";
  
    return Controller.extend("ui5.walkthrough.controller.AddInvoice", {
      
      onInit: function () {
       // alert("test")
        // Poți pune aici inițializări dacă e nevoie
      },
  
      onNavBack: function () {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();
  
        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          this.getOwnerComponent().getRouter().navTo("main", {}, true);
        }
      },
  
      onSaveFactura: function () {
        const oView = this.getView(); //legatura dintre fisirrul xml si js controller
  
        const sNume = oView.byId("numeInput").getValue();//ia valoarea pe care utilizatorul as scriso in campul input cu numeleInput
        const sPrenume = oView.byId("prenumeInput").getValue();
        const sAdresa = oView.byId("adresaInput").getValue();
        const sProdus = oView.byId("produsInput").getValue();
        const fPret = parseFloat(oView.byId("pretInput").getValue());
  
        if (!sNume || !sPrenume || !sAdresa || !sProdus || isNaN(fPret)) {
          MessageToast.show("Completează toate câmpurile!");
          return;
        }
  
        const oModel = this.getOwnerComponent().getModel("invoice");
        const aInvoices = oModel.getProperty("/invoices");
  
        aInvoices.push({
          ProductName: sProdus,
          Quantity: 1,
          ExtendedPrice: fPret,
          ShipperName: sNume + " " + sPrenume,
          DeliveryAddress: sAdresa,
          Status: "Nou"
        });
  
        oModel.setProperty("/invoices", aInvoices);//actualizam lista de facuturi din UI
        MessageToast.show("Factura a fost adăugată cu succes!");
  
        // Resetează câmpurile
        oView.byId("numeInput").setValue("");
        oView.byId("prenumeInput").setValue("");
        oView.byId("adresaInput").setValue("");
        oView.byId("produsInput").setValue("");
        oView.byId("pretInput").setValue("");
      }
  
    });
  });
  