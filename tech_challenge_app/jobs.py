import frappe


def remove_rejected_candidates():
    frappe.db.sql("""
        DELETE FROM `tabCandidate` WHERE status = 'Rejected'
    """)
