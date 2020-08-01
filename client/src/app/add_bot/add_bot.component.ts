import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import { BotsService } from '../_services/bots.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { Bot } from '../_models/bot';
import { ActivatedRoute } from '@angular/router';
import { map, flatMap, take} from 'rxjs/operators';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-bot-page',
  templateUrl: './add_bot.component.html',
  styleUrls: ['./add_bot.component.scss']
})
export class AddBotComponent implements OnInit {
    libraries = [
        'discordcr',
        'Discord.NET',
        'DSharpPlus',
        'Nostrum',
        'DiscordGo',
        'Discord4Java',
        'Javacord',
        'JDA',
        'discord.io',
        'discord.js',
        'Discordie',
        'Eris',
        'Discordia',
        'Restcord',
        'Yasmin',
        'Disco',
        'discord.py',
        'Discordrb',
        'discord-rs',
        'serenity',
        'SwiftDiscord',
        'Sword',
        'Other/Custom'
    ];
    addBotForm = new FormGroup({
        botId: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{18}$/)]),
        botName: new FormControl('', [Validators.required]),
        prefix: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        library: new FormControl('', [Validators.required]),
        invite: new FormControl('', [Validators.pattern(/^(https:\/\/discord.com\/api\/oauth2\/authorize\/.+)*$/)]),
        short_desc: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        long_desc: new FormControl('', [Validators.required, Validators.minLength(200)]),
        support_server: new FormControl('', [Validators.pattern(/^(https:\/\/discord.gg\/[A-Za-z0-9]+)*$/)]),
        source_code: new FormControl('', [Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/)]),
        website: new FormControl('', [Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/)]),
        ownerIds: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]{18},{0,1})+$/)])
    });

    constructor(private authService: AuthService, private botsService: BotsService, private snackBar: MatSnackBar) {

    }

    get botId(): AbstractControl  {
        return this.addBotForm.get('botId');
    }

    get botName(): AbstractControl  {
        return this.addBotForm.get('botName');
    }

    get prefix(): AbstractControl  {
        return this.addBotForm.get('prefix');
    }

    get library(): AbstractControl  {
        return this.addBotForm.get('library');
    }

    get invite(): AbstractControl  {
        return this.addBotForm.get('invite');
    }

    get short_desc(): AbstractControl  {
        return this.addBotForm.get('short_desc');
    }

    get long_desc(): AbstractControl  {
        return this.addBotForm.get('long_desc');
    }

    get support_server(): AbstractControl  {
      return this.addBotForm.get('support_server');
    }

    get source_code(): AbstractControl {
      return this.addBotForm.get('source_code');
    }

    get website(): AbstractControl {
      return this.addBotForm.get('website');
    }

    get ownerIds(): AbstractControl {
      return this.addBotForm.get('ownerIds');
    }

    ngOnInit(): void {
    }

    touchedAndInvalid(control: AbstractControl): boolean {
        return control.invalid && (control.dirty || control.touched);
    }

    submitBot(): void {
        if (this.addBotForm.invalid) {
            return;
        }
        this.botsService.addBot({
            id: this.botId.value,
            ownerId: '',
            avatar: '',
            name: this.botName.value,
            status: '',
            prefix: this.prefix.value,
            library: this.library.value,
            invite: this.invite.value,
            short_desc: this.short_desc.value,
            long_desc: this.long_desc.value,
            support_server: this.support_server.value,
            github: this.source_code.value,
            website: this.website.value,
            ownersIds: this.ownerIds.value
        }).subscribe(() => {
            this.snackBar.open('Successfully submitted the bot!');
        }, () => {
            this.snackBar.open('Failed to submit the bot.');
        });
    }
}
// why are you in add_bot

// im so confused, the docs are saying to do that? 
// because its for the add bot form in Long Description area. <====================
// https://material.angular.io/cdk/text-field/overview <--- <--- <--- <--- <--- <---