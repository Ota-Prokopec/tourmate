const privateKey =
	'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDXfyjwSNzmi+T7\nsrx+LVbDglJEXeHk1pNaisVLXdVCqVovqixdA+WqbyBEXxeaNDeQCadcxYHCY9LP\n5cs2fMV854fUWvGb1gLvKmFbMiKcFNOZdBAUP7Af7MqATfiy0macki1XDQInsazK\n3ibsk/mc/qMMxm3LeqcsLY3dUoAazXuVPgbURUSAY3Us8AravdUoe170k+splOeY\nYGylb7Do3Xt3SXrTkMFzze1cH71QR5NdgU5iQ5PtW8YvknQtPOj8l9vi7A9FMO1v\n/BEEek79GYmzW01A3HEsnd4iP210GZ5BNjPjMy8yUCGStTR6TD4ltO4quJgCtHbJ\nuCwtmWW3AgMBAAECggEABhsrTMuzvrCeF2e0IZslRzrtG9TRLsvJtxoRhxYskcv8\nqzcWNLiEjHTDpExRfeQW4vTzEhTinWB4u71WKcAVVHm3BpRhHjpNMPuxcIUWJ/gL\nGuEIB5raYb0y67nJ3z9I+wzFTh8nPXqyW7k5vyBeRU2NzzHcMJTUIdNUnr3UtW2p\nzPqos4QLtDpRF9MV6dNAkAz3tuSm3GAmRVa38W+0X25Xe8mNuHLWsa3SCr5HUejE\nYNZ7YcFYRaUK459KOp6qQBRpjhoonvrU0nCuVyu9PbOr+Jca2b6D7tUy4DG9+hd4\n+dmhIsJse+iw1tcBf0Lwy2QNbnMXgGyvARI/lwyysQKBgQD1Y68HIpXRYby3tCfl\ntHx+cwwR1l5m4neFR4sVr2ehs/P598dPzutQs8yLatcmfI0D2RtipPI6OXhlMa1p\nRWMb8x9UdeUyuju7SwyP6e1efhYTffraMyUnR6bDTOOvjTvsdxmEhPrzAWcJ8lDt\nD8WzuXHVJnbI8uuEzZVlEbl2KQKBgQDg0JT4gF4Vei9zJcR1iD+hhfBeF/R7c4DT\n16iin4GJmtPfxjlPRjBhYGZVC0tWbAxoa5pp+834Gf8nABNiCygfGNHFzdd6GA+N\nyBavlPTTn49LKTwh4HLRf1i/YVXtn4g2xtueW6k+fR8HbJQ06A1+qM1kfjArfgt4\nkR/Kpu643wKBgQDn9l4asY/LyMc7JFreodlZMunC5tCAEy4GWBXa3t9olRJZRecr\nwx7gP8ZoOAu/ftdSPuXLPr8XWQI9LlONgqDoZ89C6NtLM46JQq1SUUAoJao6rMj3\ngIdrdSjnzwQgC7MMmZ0OjyIlmjrLxTrIjTNG7FL1uZFp7W/DLw885h9Z2QKBgACQ\n5d8eS55YOWhbzvvQxQA+GxXRj58D8m4WG+mU5zmWdzQYBqrpbVPBb2CFb8Ie8YUN\nyEy+Ao2+WwMZH/NePdKeOGD8HK/FAb0EpPH6OQeTXkP9LZaUPxXB8VJCB3parXgd\n1g23A10R6ZMWNeVQNEB+Yk3/d1WUsqiyDNdwxicXAoGAcuD6F8N12MuypgsBfZur\n8MJcULJGOLA5i33LIrX8zdFcIb51h36F1xTe/Mxh83Rr1ixyk5tqcdO6J1iRv6kC\n129SA479FTP5NPVJmua/vgybDsl6V42jvVS8BlYqm19Lpwh37J94AZuJ+IUXhQxP\neqRsjKxBvOSVSTTCf2oBrLI=\n-----END PRIVATE KEY-----\n'?.replace(
		/\\n/gm,
		'\n',
	) ?? ''

export default {
	private_key: privateKey ?? 'notfound',
	type: 'service_account',
	project_id: 'experiences-5dfad',
	private_key_id: '0adc32aca216a508306cf5f8b2252741349fe05d',

	client_email: 'firebase-adminsdk-xopyz@experiences-5dfad.iam.gserviceaccount.com',
	client_id: '110119845593257399449',
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url:
		'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xopyz%40experiences-5dfad.iam.gserviceaccount.com',
	universe_domain: 'googleapis.com',
}
