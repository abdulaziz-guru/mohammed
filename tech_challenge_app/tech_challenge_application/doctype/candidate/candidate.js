// Copyright (c) 2023, mohamed.salamaa41@gmail.com and contributors
// For license information, please see license.txt

frappe.ui.form.on('Candidate', {
	 refresh: function(frm) {
        frm.add_custom_button(__('Get User Email Address'), function(){
                frappe.msgprint(frm.doc.email);
            };
     }
});
